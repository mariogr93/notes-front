import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { Subscription, catchError, throwError, timer } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ModalService } from "src/app/services/modal-msg.service";
import { SessionService } from "src/app/services/session.service";
import { unsubscribeMany } from "src/utils/subscription-management";

@Component({
    selector: "login-component",
    templateUrl:"./login.component.html",
    styleUrls:["./login.component.css"]
})

export class LoginComponent implements OnDestroy{

  userNotFound = false;
  subs: Subscription[] = [];

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router,
    private modal: ModalService
  ) {}

  ngOnDestroy(): void {
    unsubscribeMany(this.subs);
}

  onSubmit(): void{
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
      .pipe(
        catchError(err => {
            if(err.error.statusCode == 404){
              this.userNotFound = true;
            }
            this.openSimpleModalDanger()
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

  openSimpleModalDanger(){
    this.modal.openSimpleModal({title: "Ooops!", message:"Something went wrong, please check your credentials.", isSuccess: false})
    this.subs.push(timer(1500).subscribe(() => this.modal.closeSimpleModal()));

}
}