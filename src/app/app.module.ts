import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/auth/auth.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthTabsComponent } from './components/auth/auth-tabs/auth-tabs.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';
import { NotesComponent } from './components/notes/notes.component';
import { CreateNoteComponent } from './components/notes/create-note/create-note.component';
import { NoteService } from './services/notes.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AuthTabsComponent,
    LoginComponent,
    RegisterComponent,
    NotesComponent,
    CreateNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, SessionService, NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
