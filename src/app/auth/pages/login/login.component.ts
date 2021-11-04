import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  public miForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.miForm.reset({ //se puede usar en lugar de setValue, tambien se puede usar pachValue
      email: 'johan_5@gamil.com',
      password: '234234234234'
    })
  }
  public login(): void {
     console.log(this.miForm.controls.password.value);
     const {email,password}=this.miForm.value;
 
     this.authService.login(email,password).subscribe(
       (resp)=>{
         console.log(resp);
         if (resp===true) {
           this.router.navigateByUrl('/app/dashboard')
         } else {
 
           Swal.fire('Error',resp,'error');
         }
         
       }
     )

  }

}
