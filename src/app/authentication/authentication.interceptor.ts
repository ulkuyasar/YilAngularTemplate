import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";

import { BaseInterceptor } from "../core/http/base-interceptor";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationInterceptor extends BaseInterceptor implements HttpInterceptor{

    constructor(injector:Injector){
        super(injector);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if(this.isUrlInIgnoreList(request.url)===false){
        let autService :AuthenticationService=this.injector.get(AuthenticationService);
        if(autService.isAuthenticated){
          request = request.clone({
            setHeaders:{
              Authorization:`Bearer ${autService.accessToken}`
            }
          });
        }
      }
      return next.handle(request);
    }
}
