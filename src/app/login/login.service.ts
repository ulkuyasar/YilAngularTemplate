import { Injectable, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationResponce } from "../authentication/authentication-responce";
import { AuthenticationService } from "../authentication/authentication.service";
import { BaseService } from "../core/services/base-sevice";
import { PopupOptions } from "../layouts/popup/popup-options";
import { PopupRef } from "../layouts/popup/popup-ref";
import { PopupService } from "../layouts/popup/popup-service";
import { LocalizationService } from "../localization/localization.service";
import { LogoutComponent } from "./logout/logout.component";

@Injectable({
  providedIn:'root'
})
export class LoginService extends BaseService{


    private _router;
    private _activatedRoute: ActivatedRoute;
    private _authenticationService: AuthenticationService;
    private _popupService: PopupService;
    private _localizationService: LocalizationService;

    constructor(injector:Injector){
      super(injector);
      this._router = this.Injector.get<Router>(Router);
      this._activatedRoute = this.Injector.get<ActivatedRoute>(ActivatedRoute);
      this._authenticationService = this.Injector.get<AuthenticationService>(AuthenticationService);
      this._popupService = this.Injector.get<PopupService>(PopupService);
      this._localizationService = this.Injector.get<LocalizationService>(LocalizationService);
    }

    login(userName:string,password:string,CaptchaKey?:string,encriptionKey?:string):Observable<void>{
      let $authLogin = this._authenticationService.login(userName,password,CaptchaKey,encriptionKey).pipe(
        map((authResponce:AuthenticationResponce)=>{
          let returnUrl:string = this.getReturnUrl();
          this.router.navigate([returnUrl]);
        })
      );
      return $authLogin;

    }

    logout(){
      let popupOptions: PopupOptions = new PopupOptions({
        Title:this._localizationService.getMessage('logout-caption'),
        Width:400,
        Height:300,
        ShowCloseButton:false,
        DragEnabled:false,
        Position:{
          my:'center',at:'center',of:window
        }
      });
      let popupRef :PopupRef<LogoutComponent> = this._popupService.openGlobalPopupWithComponentType(LogoutComponent,popupOptions);
      popupRef.afterClosed().subscribe((returnValue:boolean)=>{
        if(returnValue===true){
          this.navigateToLogin(true);
        }
      });
    }

    navigateToLogin(withLogOutRequest:boolean){
      this._authenticationService.logout(withLogOutRequest);
      this._authenticationService.firstLogin();
    }

    private getReturnUrl():string{
      if(this._activatedRoute.snapshot.queryParamMap.has('returnUrl')){
        return this._activatedRoute.snapshot.queryParamMap.get('returnUrl');
      }
      return '';
    }

}
