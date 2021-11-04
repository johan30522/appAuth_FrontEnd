import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { ValidarLoginGuard } from './guards/validar-login-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(
        (module) => module.AuthModule
      )
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./protected/protected.module').then(
        (module) => module.ProtectedModule
      ),
      canActivate:[ValidarTokenGuard],
      canLoad:[ValidarTokenGuard]
  },
  {
    path:'**',
    redirectTo:'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:false// habilita la compatibilidad de rutas en navegadores antiguos y con conflictos en rutas existentes de backend
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
