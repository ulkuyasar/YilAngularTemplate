import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseResolver } from "../core/resolvers/base-resolver";
import { LocalizationService } from "./localization.service";

@Injectable()
export class LocalizationResolver extends BaseResolver<string>{

    constructor(private localization:LocalizationService){
        super();
    }

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<string>{
        return this.localization.loadMessages().pipe(
            map(()=>{
                return this.localization.setDefaultLanguage();
            })
        )
    }

}