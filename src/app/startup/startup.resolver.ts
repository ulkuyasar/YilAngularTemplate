import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { BaseResolver } from "../core/resolvers/base-resolver";


@Injectable()
export class StartupResolver extends BaseResolver<string>{

    constructor(){
        super();
    }

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<string>{
        return of('Welcome to Cakallik');
    }

}