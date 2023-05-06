import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from "@angular/forms";
import { catchError, throwError } from "rxjs";
import { UserRegistration } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/services/authentication.service";


@Component({
    selector: "register-component",
    templateUrl: "./register.component.html",
    styleUrls:["./register.component.css"]
})

export class RegisterComponent {
    registrationFailed: boolean = false;
    emailAlreadyUsed: boolean = false;


    userRoles = [
        {id:1, roleName:"User", role:"ROLE_USER"},
        {id:1, roleName:"Admin", role:"ROLE_ADMIN"}
    ];
    
    newUserForm = this.fb.group({
        firstName: [ '', Validators.required ],
        lastName: [ '', Validators.required ],
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [ '', Validators.required ],
        confirmPassword: [ '', Validators.required ],
        role: [ '', Validators.required ]
    }, { validators: [ this.matchingPasswordsValidator ] });


    get firstNameControl(): FormControl {
        return this.newUserForm.get("firstName") as FormControl;
    }

    get lastNameControl(): FormControl {
        return this.newUserForm.get("lastName") as FormControl;
    }

    get emailControl(): FormControl {
        return this.newUserForm.get("email") as FormControl;
    }

    get passwordControl(): FormControl {
        return this.newUserForm.get("password") as FormControl;
    }

    get confirmPasswordControl(): FormControl {
        return this.newUserForm.get("confirmPassword") as FormControl;
    }

    get roleControl(): FormControl {
        return this.newUserForm.get("role") as FormControl;
    }

    constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

    onSubmit(): void {

        if (this.newUserForm.valid) {
           const newUser: UserRegistration = this.getFrom()

            this.authService.registerUser(newUser).pipe(
                catchError(err => {
                    if(err.status == 409) {
                        this.emailAlreadyUsed = true
                        this.emailControl.setValue('');
                        this.emailControl.markAsTouched();
                    }
                    this.registrationFailed = true;
                    this.passwordControl.setValue('');
                    this.passwordControl.markAsTouched();
                    this.confirmPasswordControl.setValue('');
                    this.confirmPasswordControl.markAsTouched();
                    

                    return throwError(() => err)
                })).subscribe(res => {
                    this.newUserForm.reset();
                    this.registrationFailed = false;
                    this.emailAlreadyUsed = false;
                });
        }
    }

    matchingPasswordsValidator(form: AbstractControl): ValidationErrors | null {
        const pass = form.get('password') as FormControl;
        const confirmPass = form.get('confirmPassword') as FormControl;

        return pass && confirmPass && pass.value == confirmPass?.value
            ? null
            : { matchingPasswordsValidator: true };
    }

    getFrom():UserRegistration {
        const signupForm: UserRegistration = {
            firstName : this.firstNameControl.value,
            lastName: this.lastNameControl.value,
            email: this.emailControl.value,
            password:this.passwordControl.value,
            role: this.newUserForm.get("role")?.value
        }
        return signupForm;
    }
}