import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

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
import { ListNoteComponent } from './components/notes/list-note/list-note.component';
import { ModalService } from './services/modal-msg.service';
import { ModalComponent } from './components/shared/modal/modal.component';
import { AuthGuard } from './services/connection/auth-guard.service';
import { CustomInterceptor } from './services/connection/http.interceptor';
import { SimpleModalComponent } from './components/shared/simple-modal/simple-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AuthTabsComponent,
    LoginComponent,
    RegisterComponent,
    NotesComponent,
    CreateNoteComponent,
    ListNoteComponent,
    ModalComponent,
    SimpleModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, SessionService, NoteService, ModalService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
