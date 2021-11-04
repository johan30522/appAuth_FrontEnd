import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }


  private _urlApi: string = environment.baseUrlApi;


  constructor(private readonly httpClient: HttpClient) { }

  public register(name:string, email: string, password: string){

    const url = `${this._urlApi}auth/new`
    const body = {
      email,
      password,
      name
    }
    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msj))
      )
  }

  public login(email: string, password: string) {

    const url = `${this._urlApi}auth/`
    const body = {
      email,
      password
    }
    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msj))
      )
  }
  public validarToken():Observable<boolean> {
    const url = `${this._urlApi}auth/renew`;
    const headers=new HttpHeaders()
      .set('x-token',localStorage.getItem('token')||'')

    return this.httpClient.get<AuthResponse>(url,{headers})
      .pipe(
        map(resp=>{
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email:resp.email!
          }
          return resp.ok;
        }),
        catchError(err=>of(false))
      )

  }
  public logOut(){
    localStorage.clear();
  }

}
