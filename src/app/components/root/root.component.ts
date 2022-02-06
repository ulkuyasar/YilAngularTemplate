import {  Component,  OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { BaseComponent } from "src/app/core/components/base-component";
import { Data } from "@angular/router";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { LoginService } from "src/app/login/login.service";
import { ErrorService } from "src/app/core/services/error-service";
import { AuthenticationContextType } from "src/app/authentication/authentication-context-type.enum";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(RootComponent,"RootComponent")
export class RootComponent extends BaseComponent implements OnInit,OnDestroy{

   constructor(viewContainerRef:ViewContainerRef){
         debugger;
         super(viewContainerRef);
         this.activatedRoute.data.subscribe(data=>this.navigateToFirst(data));
         this.initializeErrorService();
   }

   ngOnInit(): void {
       super.ngOnInit();
       this.setInitialAuthenticationContextType();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  private navigateToFirst(data:Data){
    let autService = this.Injector.get<AuthenticationService>(AuthenticationService);
    let loginService = this.Injector.get<LoginService>(LoginService);

    let isAuthenticated:boolean =autService.isAuthenticated;
    if(isAuthenticated){
      //yenı token al
      //autService.renewToken().subscribe();
    }else{
      loginService.navigateToLogin(false);
    }
  }


  private initializeErrorService():void{
    let errorService:ErrorService = this.Injector.get<ErrorService>(ErrorService);
    errorService.initialize();
  }

  private setInitialAuthenticationContextType():void{
    let autService = this.Injector.get<AuthenticationService>(AuthenticationService);
    let autContextType:AuthenticationContextType = autService.getAuthenticationContextTypeFromActivatedRouteChain(this.activatedRoute.snapshot);
    autService.changeAuthenticationContextType(autContextType);
  }

  // private initilizeNetworkService():void{
  //   let netService = this.Injector.get<NetworkService>(AuthenticationService);
  //   netService.initialize();
  // }


}
