import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable, Subscriber } from "rxjs";
import { BaseService } from "../core/services/base-sevice";
import { AppConfig } from "./app.config";
import { appVisibleVersion,appVersion,configFileUrl } from "./config.constants";



@Injectable({providedIn:'root'})
export class ConfigService extends BaseService{

    private _appConfig : AppConfig;
    private _configSubscribers:Subscriber<AppConfig>[];


    constructor(private http: HttpClient, injector:Injector){
        super(injector);
        this._configSubscribers = [];
        this._appConfig = new AppConfig();
    }

    public getConfig():Observable<AppConfig>{
        return this.http.get<AppConfig>(configFileUrl).pipe(
            map(appConfig => {
                this.updateConfig(appConfig);
                return appConfig;
            })
        );
    }

    get appConfig():AppConfig{
        return this._appConfig;
    }

    private updateConfig(appConfig:AppConfig):void{
        this._appConfig=appConfig;
        this._appConfig.AppVersion = appVersion;
        this._appConfig.AppVisibleVersion = appVisibleVersion;

        this._configSubscribers.filter(Subscriber=>Subscriber.closed ===true ).forEach(Subscriber=>{
            this._configSubscribers.slice(this._configSubscribers.indexOf(Subscriber),1);
        });

        this._configSubscribers.forEach(subscriber=>{
            if (subscriber.closed === false){
                subscriber.next(this._appConfig);
            }
        });
    }

    private requestAppConfig() : Observable<AppConfig>{
        return new Observable<AppConfig>((subscriber:Subscriber<AppConfig>) => {
            this._configSubscribers.push(subscriber);
            if(this._appConfig){
                subscriber.next(this._appConfig);
            }
        })
    }








}