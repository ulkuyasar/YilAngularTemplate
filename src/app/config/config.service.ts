import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { BaseService } from "../core/services/base-sevice";
import { AppConfig } from "./app.config";


@Injectable({providedIn:'root'})
export class ConfigService extends BaseService{

    private _appConfig : AppConfig;
    private _configSubscribers:Subscriber<AppConfig>[];


    constructor(private http: HttpClient, injector:Injector){
        super(injector);
        this._configSubscribers = [];
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


        Yasar.....



    }







}