import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { SessionService } from "../session.service";
import { Router } from "@angular/router";


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.sessionService.token;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        headers = this.addToken(jwt, headers);

        const reqClone = req.clone({
            headers
        })
        

        return next.handle(reqClone).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                return this.errorHandler(errorResponse);
            })
        )
    }

    private addToken(jwt:String ,headers: HttpHeaders){
        if(jwt && jwt != ''){
          return headers.append('Authorization', `Bearer ${jwt}` );
        }
        return headers;
      }

      private errorHandler(error: HttpErrorResponse){
        if(error.status >= 500){
          //this.router.navigate(['auth'])
          console.log("error 500, revisa el backend", error)
        }
        return throwError(() => error);
      }

}