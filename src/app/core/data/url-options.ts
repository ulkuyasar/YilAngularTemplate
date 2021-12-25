import { IUrlOptions } from "./iurl-options";
import { QueryStringParam } from "./query-string-param";

export class UrlOptions{
    controller?:string;
    action?:string;
    id?:any;
    addLangQueryString?:boolean;
    queryParams?:Array<QueryStringParam>;
    expands?:string[];
    skipAuthorization?:boolean; // sadece get methodlarında

    constructor(options:IUrlOptions = {}){
        if(options.controller){
            this.controller = options.controller;
        }

        if(options.action){
            this.action = options.action;
        }

        if(options.id){
            this.id = options.id;
        }

        if(options.addLangQueryString){
            this.addLangQueryString = options.addLangQueryString;
        }

        if(options.queryParams){
            this.queryParams = options.queryParams;
        }

        if(options.expands){
            this.expands = options.expands;
        }

        if(options.skipAuthorization){
            this.skipAuthorization = options.skipAuthorization;
        }

    }
}
