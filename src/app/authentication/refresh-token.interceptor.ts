import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { BaseInterceptor } from "../core/http/base-interceptor";
import { AppsettingDefinitionService } from "../services/definition/appsetting-definition.service";
import { StorageService } from "../storage/storage-service";
import { AuthenticationConstants } from "./authentication.constants";
import { AuthenticationService } from "./authentication.service";



@Injectable()
export class RefreshTokenInterceptor extends BaseInterceptor implements HttpInterceptor{

    private _storageService:StorageService;

    constructor(injector:Injector,
                private authenticationService:AuthenticationService,
                private beamerAppSettingDefinitionService:AppsettingDefinitionService){
        super(injector);
        this._storageService = this.injector.get<StorageService>(StorageService);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let isOutSideResource = (request.url.substring(0,3) !== "../");
      if(isOutSideResource){
        return next.handle(request);
      }

      let user = this.authenticationService.currentUser;
      if(user){
        let now = new Date().getTime()/1000;
        let secondsLeftBeforeTokenExpire = (user.exp-now);
        let hasTokenExpired = (now>user.exp);

        if(this.authenticationService.isAuthenticated && !hasTokenExpired && secondsLeftBeforeTokenExpire >3000){
          return next.handle(request);
        }
      }
      this._storageService.removeItem(AuthenticationConstants.ACCESSTOKEN);
      return this.beamerAppSettingDefinitionService.getUserInfo(environment.refreshToken).pipe(
        mergeMap(responce=>{
            this.authenticationService.processLogInwithToken(responce.token);
            return next.handle(request);
        })
      )


    }
}
