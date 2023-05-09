import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/auth/auth.component';
import { NotesComponent } from './components/notes/notes.component';
import { AuthGuard } from './services/connection/auth-guard.service';

const routes: Routes = [
  {
    path: "auth",
    component: AuthenticationComponent
  },
  {
    path: "auth/notes",
    component: NotesComponent,
    canActivate: [AuthGuard]
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
