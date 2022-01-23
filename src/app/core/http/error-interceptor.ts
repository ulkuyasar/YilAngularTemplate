import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ErrorService } from "../services/error-service";
import { BaseInterceptor } from "./base-interceptor";

@Injectable()
export class ErrorInterceptor extends BaseInterceptor implements HttpInterceptor{
    
    constructor(injector:Injector){
        super(injector);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                (event:HttpEvent<any>) =>{},
                (error:HttpErrorResponse) => {
                    let errorService:ErrorService = this.injector.get<ErrorService>(ErrorService);
                    errorService.handleHttpErrorResponce(error).subscribe();
                }
            )
        )
    }
    

}