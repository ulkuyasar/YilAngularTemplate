import { EventEmitter, Injectable, Injector } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import DataSource from "devextreme/data/data_source";
import { BaseService } from "../services/base-sevice";
import { NavigationOptions } from "./navigation-options";


@Injectable({providedIn:'root'})
export class NavigationService extends BaseService{
    
    constructor(injector:Injector){
        super(injector);
    }

    navigate2(path:string, args? :any[],queryParams?:Params,activatedRoute?:ActivatedRoute){
        let router : Router = this.Injector.get<Router>(Router);

        let command :any[] = args ? Array.of([path],args) : [path];
        router.navigate(command, {queryParams:queryParams,relativeTo:activatedRoute});
    }

    
    navigate( options: NavigationOptions){
        let router : Router = this.Injector.get<Router>(Router);

        let command:any[] = [];
        command.push(options.Path);

        if (options.Args){
            options.Args.forEach(arg=>command.push(arg));
        }
        router.navigate(command, {queryParams:options.QueryParams,relativeTo:options.RelativeTo});
    }

}