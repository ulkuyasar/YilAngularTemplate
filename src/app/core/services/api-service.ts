import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UrlOptions } from "../data/url-options";
import { IHttpOptions } from "../http/ihttp-options";
import { StringUtilities } from "src/app/utilities/string-utilities";
import { QueryStringParam } from "../data/query-string-param";
import { GlobalUtilities } from "src/app/utilities/global-utilities";
import { BaseService } from "./base-sevice";


export abstract class  ApiService extends BaseService{
    
    private _baseUrl: string;
    private _apiUrl: string;
    private _http: HttpClient;

    public getHeaders: () => HttpHeaders | {[header:string]:string | string[]};
    public getParams: () => HttpParams | {[header:string]:string | string[]}; 

    constructor(injector:Injector, controller?:string,customUrl:string = environment.apiUrl,){
        super(injector);
        this._http = injector.get<HttpClient>(HttpClient);
        this._baseUrl = customUrl;
        this._apiUrl = customUrl + '/' + controller;
       
        this.getHeaders = HttpHeaders as any; //yasar  sen ekledın dıkkat
        this.getParams = HttpParams as any;   //yasar  sen ekledın dıkkar
    }

    get baseUrl(){
        return this._baseUrl;
    }

    get apiUrl(){
        return this._apiUrl;
    }
    get http():HttpClient{
        return this._http;
    }

    private createOptions():IHttpOptions{
        let options:IHttpOptions = {};
        if(this.getHeaders){
            options.headers = this.getHeaders();
        }
        if(this.getParams){
            options.params = this.getParams();
        }
        return options;
    }

    getRequest<T>(url:string):Observable<T>{
        return this.http.get<T>(url,this.createOptions());
    }

    postRequest<T>(url:string,body:string):Observable<T>{
        return this.http.post<T>(url,body,this.createOptions());
    }

    putRequest<T>(url:string,body:string):Observable<T>{
        return this.http.put<T>(url,body);
    }
    
    patchRequest<T>(url:string,body:string):Observable<T>{
        return this.http.patch<T>(url,body,this.createOptions());
    }
    
    deleteRequest<T>(url:string):Observable<T>{
        return this.http.delete<T>(url,this.createOptions());
    }

    protected getUrl(urlOptions : UrlOptions):string{
        let url:string;
        url = this.apiUrl;
        if(urlOptions.controller){
            url=StringUtilities.combinePath(url,urlOptions.controller);
        }
        url = StringUtilities.combinePath(url,urlOptions.action as string);
        
        if (urlOptions.id != undefined && urlOptions.id !=null){
            if (typeof (urlOptions.id) === 'string'){
                url += '/'+urlOptions.id;
            }else{
                url += '/'+urlOptions.id;
            }
        }

        let queryParams = Array<QueryStringParam>();
        if (urlOptions.queryParams !=null && urlOptions.queryParams.length>0){
            urlOptions.queryParams.forEach(p=>{
                queryParams.push(p);
            })
        }

        if (urlOptions.skipAuthorization && urlOptions.skipAuthorization === true){
            let paramSkipAuthorization = new QueryStringParam();
            paramSkipAuthorization.key = 'skipAuth';
            paramSkipAuthorization.value = true;
            paramSkipAuthorization.removeQuotes = true;
            queryParams.push(paramSkipAuthorization);
        }

        if (queryParams!=null && queryParams!=undefined && queryParams.length>0){
            url = StringUtilities.combinePath(url,GlobalUtilities.getQueryParamsString(url,queryParams));
        }
        return url;

    }

}