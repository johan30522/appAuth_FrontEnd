import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
*{

  margin:15px;
}


` ]
})



export class DashboardComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }


  get usuario() {
    return this.authService.usuario;
  }
  ngOnInit(): void {
  }


  public logout(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/auth/login');
  }
}
