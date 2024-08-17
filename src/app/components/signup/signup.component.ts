import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private autservice:AuthService,private router:Router){
   
  }

  
  email = new FormControl("",[
    Validators.required,
    Validators.email
    ]
  )

  password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
    ]
  )

  signupForm = new FormGroup({
    email:this.email,
    password:this.password
})

signup(){
  this.autservice.registerUser(this.signupForm.value.email as string,this.signupForm.value.password as string)
}


reset(){
  this.signupForm.reset();
}
}
