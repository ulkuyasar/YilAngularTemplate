import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { BaseInterceptor } from "./base-interceptor";

@Injectable()
export class JsonInterceptor extends BaseInterceptor implements HttpInterceptor{
    
    constructor(injector:Injector){
        super(injector);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.method === 'POST' || request.method === 'PUT'){
            if (!(request.body instanceof FormData)){
                request = request.clone({
                    setHeaders:{
                        'Content-Type':'application/json'
                    }
                });
            }
        }
        return next.handle(request); 
    }
}