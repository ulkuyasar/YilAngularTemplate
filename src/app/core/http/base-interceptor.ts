import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";
import { configFileUrl } from "src/app/config/config.constants";
import { globalMessagesDictionaryFileUrl } from "src/app/localization/localization.constants";

export abstract class BaseInterceptor implements HttpInterceptor{
    private _ignoreList:string[];

    constructor(private _injector:Injector){
        this.createIgnoreList();
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }
    public get injector():Injector{
        return this._injector;
    }
    private createIgnoreList() {
        this._ignoreList = [];
        this._ignoreList.push(configFileUrl);
        this._ignoreList.push(globalMessagesDictionaryFileUrl);

    }

    protected isUrlInIgnoreList(url:string):boolean{
        return this._ignoreList.filter(item=> url === item).length>0;
    }

}