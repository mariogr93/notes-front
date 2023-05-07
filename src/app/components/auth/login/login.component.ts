import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";
import { SessionService } from "src/app/services/session.service";

@Component({
    selector: "login-component",
    templateUrl:"./login.component.html",
    styleUrls:["./login.component.css"]
})

export class LoginComponent {

  userNotFound = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  onSubmit(): void{
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
      .pipe(
        catchError(err => {
            if(err.error.statusCode == 404){
              this.userNotFound = true;
            }
            console.log("catchError",err)
            return throwError(()=> err) 
        })
      )
      .subscribe((res) => {
        this.sessionService.userInfo = res.data.user;
        this.sessionService.token = res.data.user.token;
        this.userNotFound = false;
        this.loginForm.reset();
        this.router.navigate(['/auth/notes']);
      });
    }
  }
}