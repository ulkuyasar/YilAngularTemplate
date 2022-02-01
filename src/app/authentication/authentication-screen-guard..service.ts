import { Injectable } from "@angular/core"
import { Observable} from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({providedIn:'root'})
export class AuthenticationScreenGuard implements CanActivate{

    constructor(private authenticationService:AuthenticationService,private router:Router){

    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let hasScreen = this.authenticationService.hasScreen(route.data.reoles);
    if (!route.data.reoles || hasScreen){
      return true;
    }
    this.router.navigate(['main']);
    return false;
  }

}
