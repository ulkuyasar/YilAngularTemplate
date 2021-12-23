import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";


export  abstract class BaseResolver<T> implements Resolve<T>{
    abstract resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<T>;
}