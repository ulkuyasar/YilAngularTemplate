// gerisi telefonunda 13 aaralik

import { Injectable } from "@angular/core"
import { UUID } from "angular2-uuid"
import { isDate } from "lodash";
import { QueryStringParam } from "../core/data/query-string-param";


@Injectable({ providedIn: 'root'})
export class GlobalUtilities  {
   
    public static NewGuid():string{
        return UUID.UUID();
    }

    public static SetEncodedLocalStorageData(key:string, data:string){
        const encodedData = btoa(unescape(encodeURIComponent(data)));
        localStorage.setItem(key,encodedData);
    }

    public static GetEncodedLocalStorageData(key:string):any{
        const storedData = localStorage.getItem(key);
        if (!storedData)
            return null;

            try {
                const decodedData = decodeURIComponent(escape(atob(storedData)));
                return JSON.parse(decodedData);
            } catch (error) {
                localStorage.removeItem(key);
            }
    }

    public static GetBaseHref(){
        const bases = document.getElementsByTagName('base');
        let baseHref = '/';

        if (bases.length>0){
            baseHref = bases[0].href;
        }
        return baseHref;

    }

    public static getQueryParamsString(url:string, arr:Array<QueryStringParam>):string{

        let queryParamsString: string = "";
        let isQuestionMarkExist: boolean = url.indexOf('?') > -1 ? true : false;

        arr.forEach(queryParam => {
            if (queryParam.value !=null && queryParam.value !== undefined){
                let queryParamString:string = "";
                queryParamString = isQuestionMarkExist ? "&" : "?";
                isQuestionMarkExist = true;
                queryParamString += queryParam.key;

                if (isDate(queryParam.value)){
                    queryParamString += "=" + (<Date>queryParam.value).toJSON();
                }else{
                    queryParamString += (typeof queryParam.value === 'string' && !queryParam.removeQuotes) ? "='" + queryParam.value + "'" : "="  + queryParam.value
                }

                if (queryParamsString != ""){
                    queryParamsString += queryParamString;
                }else{
                    queryParamsString = queryParamString;
                }

            }
        });

        if (queryParamsString === ""){
            return "";
        }
        return queryParamsString;
    }

    public static IsEmptyObject(object:any){
        for(const key in object){
            if (object.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }

    public static IsNumber(x:any): x is number{
        return typeof x === "number";
    }

    public static IsString(x:any): x is string{
        return typeof x === "string";
    }



}