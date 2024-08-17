import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uuid?: string;

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        this.uuid = user.uid;


      } else {
        this.uuid = undefined;
        console.log("user logged out");
      }
    });
   }

   isAuthenticated(){
    return this.uuid?true:false;
   }

   getUUid(){
    return this.uuid;
   }


  registerUser(email: string, password: string) {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        this.router.navigate(['/'])

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("something went wrong in signup try again");
        // ..
      });

  }

  loginUser(email: string, password: string) {


    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.router.navigate(['/'])
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("something went wrong while login please try again!");
      });

  }

  logoutUser() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert("something went wrong while logout please try again!");
    });
  }

}
