import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private dbservice:DbService){

  }
  items:any= [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.dbservice.getAllSnippet().then((data:any)=>{
      this.items = data;
     })

    
  }

}
