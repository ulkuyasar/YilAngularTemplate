import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { from, Observable } from "rxjs";
import { ConfigService } from "../config/config.service";
import { BaseService } from "../core/services/base-sevice";
import { mergeMap,map } from "rxjs/operators";
import { globalMessagesDictionaryFileUrl, moduleMessagesDictionaryFileUrlList } from "./localization.constants";
import { appVersion } from "../config/config.constants";
import Globalize from 'globalize';



@Injectable({providedIn:'root'})
export class LocalizationService extends BaseService{

    constructor(private http:HttpClient, injector:Injector){
        super(injector);
    }

    setDefaultLanguage():string{
        let configService : ConfigService = this.Injector.get<ConfigService>(ConfigService);
        return this.setLanguage('tr');

    }

    setLanguage(language:string):string{
        Globalize.locale(language);
        return language;
    }

    changeLanguage(language:string):string{
        let languageSet: string = this.setLanguage(language);
        return languageSet;
    }

    loadMessages():Observable<void>{
        let $globalMessages = this._loadMessages(globalMessagesDictionaryFileUrl);
        let $moduleMessages: Observable<string> = from(moduleMessagesDictionaryFileUrlList);
        return $globalMessages.pipe(
                mergeMap((() => {
                    return $moduleMessages.pipe(
                        mergeMap((url:string)=>{
                            return this._loadMessages(url);
                        })
                    )
                }))
        )

    }

    private _loadMessages(url:string):Observable<void>{
        let uri : string = url + "?v=" + appVersion;
        let $messages = this.http.get(uri).pipe(
            map(messages =>{
                Globalize.loadMessages(messages);
            })
        );
        return $messages as any;
    }

    getMessage(key:string | string[], args?:string |object |string[]):string{

        let formattedMessage:string;
        try {
            formattedMessage = Globalize.formatMessage(key,args);
            
        } catch (error) {
            if (key instanceof Array){
                formattedMessage = key[0];
            }else{
                formattedMessage = key;
            }           
        }
        return formattedMessage;
    }


}