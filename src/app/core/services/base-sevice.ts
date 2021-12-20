import { Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IService } from "./iservice";

export abstract class BaseService implements IService{
    public static appInjector: Injector;
    private _injector: Injector;

    constructor(injector: Injector){
        this._injector = injector;
    }

    get Injector(): Injector{
        return this._injector;
    }

    get router():Router{
        return this.Injector.get<Router>(Router);
    }

    get activatedRoute():ActivatedRoute{
        return this.Injector.get<ActivatedRoute>(ActivatedRoute);
    }

}