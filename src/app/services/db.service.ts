import { Injectable } from '@angular/core';
import { doc, getDoc, getDocs, getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore";
import { AuthService } from './auth.service';
import { title } from 'process';
import { Snippet } from '../../models/snippets';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private db?: any;

  constructor(private authservice: AuthService, private router:Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: Snippet) {

    try {
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: this.authservice.getUUid()
      });
     
      this.router.navigate(["/"])
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("error wile creating db")
    }
  }

  async getAllSnippet() {

    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
    });

    return result;
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return {
        id:"0",
        title:"not found",
        code: "not found"
      }

    }

  }

}
