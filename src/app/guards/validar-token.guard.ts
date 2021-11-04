import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {


  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

  }

  canActivate(): Observable<boolean> | boolean {

    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      )
  }
}


