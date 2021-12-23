import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscriber } from "rxjs";
import { BaseResolver } from "../core/resolvers/base-resolver";
import { AppConfig } from "./app.config";
import { ConfigService } from "./config.service";

@Injectable()
export class ConfigResolver extends BaseResolver<AppConfig>{

    constructor(private configService:ConfigService){
        super();
    }

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<AppConfig>{
        return this.configService.getConfig();
    } 

}