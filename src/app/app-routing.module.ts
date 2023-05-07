import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/auth/auth.component';
import { NotesComponent } from './components/notes/notes.component';

const routes: Routes = [
  {
    path: "auth",
    component: AuthenticationComponent
  },
  {
    path: "auth/notes",
    component: NotesComponent,
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
