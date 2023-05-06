import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/auth/auth.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthenticationComponent
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "auth",
  } ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
