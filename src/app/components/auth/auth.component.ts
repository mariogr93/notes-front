import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";


@Component({
    selector:"auth-component",
    templateUrl:"./auth.component.html",
    styleUrls:["./auth.component.css"]
})

export class AuthenticationComponent {

    tabSelected = true;
    constructor(private authService: AuthenticationService){}
    ngOnInit(): void {
     
    }

    selectedTab(e: boolean){
      this.tabSelected = e;
    }
    
}