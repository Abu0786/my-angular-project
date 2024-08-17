import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent {

  constructor(private route: ActivatedRoute,private dbservice:DbService){

  }
   codeSnippet:any = {};

  ngOnInit(){
    const snppetId = this.route.snapshot.paramMap.get('id');
    this.dbservice.getSnippetById(snppetId!).then((data:any)=>{
      this.codeSnippet = data;

    });

  }

}
