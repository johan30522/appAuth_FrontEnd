import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly router:Router,
    private readonly authService: AuthService
    ) { }

  public miForm:FormGroup=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    name:['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.miForm.reset({ //se puede usar en lugar de setValue, tambien se puede usar pachValue
      email: 'johan_5@gamil.com',
      name:'Johan Arroyo',
      password: '234234234234'
    })
  }

  public registro():void{



    const {email,password,name}=this.miForm.value;

    this.authService.register(name,email,password).subscribe(
      (resp)=>{
        console.log(resp);
        if (resp===true) {
         
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Creado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/app/dashboard')
        } else {

          Swal.fire('Error',resp,'error');
        }
        
      }
    )


  }

}
