import { IDataSourceOptions } from "./idata-source-options";
import { HttpMethod, IDataBeforeSendOptions } from "./iodata-before-send-options";
import { QueryStringParam } from "./query-string-param";


export class DataSourceOptions{
    type?:string;
    version?:number;
    method?:HttpMethod;
    controller?:string;
    action?:string;
    paginate?:boolean;
    pageSize?:number;
    select?:string[];
    queryParams?:Array<QueryStringParam>;
    skipAuthorization?:boolean;
    key?:string;
    keyType?:string;
    setKey?:boolean;
    expand?: string|string[];
    payload?:any;
    onLoading?: (loadOptions:any) => any;
    onLoaded?: (result:Array<any>) => any;
    onError?: (error:any) => any;
    beforeSend?: (request:IDataBeforeSendOptions) => any;

    constructor(options :IDataSourceOptions={})
    {
        if (options.type!=undefined){
            this.type = options.type;
        }else{
            this.type = "odata";
        }

        if (options.version!=undefined){
            this.version = options.version;
        }else{
            this.version = 4;
        }

        if (options.method!=undefined){
            this.method = options.method;
        }

        if (options.controller!=undefined){
            this.controller = options.controller;
        }

        
        if (options.action!=undefined){
            this.action = options.action;
        }

        if (options.paginate!=undefined){
            this.paginate = options.paginate;
        }else{
            this.paginate = true;
        }

        if (options.pageSize!=undefined){
            this.pageSize = options.pageSize;
        }else{
            this.pageSize = 20;
        }

        if (options.queryParams!=undefined){
            this.queryParams = options.queryParams;
        }

        if (options.skipAuthorization!=undefined){
            this.skipAuthorization = options.skipAuthorization;
        }else{
            this.skipAuthorization = false;
        }

        if (options.setKey!=undefined){
            this.setKey = options.setKey;
        }else{
            this.setKey = true;
        }

        if (options.expand!=undefined){
            this.expand = options.expand;
        }

        if (options.payload!=undefined){
            this.payload = options.payload;
        }


        if (options.onLoading!=undefined){
            this.onLoading = options.onLoading;
        }

        if (options.onLoaded!=undefined){
            this.onLoaded = options.onLoaded;
        }

        
        if (options.onError!=undefined){
            this.onError = options.onError;
        }

        if (options.beforeSend!=undefined){
            this.beforeSend = options.beforeSend;
        }

        if (this.setKey===true){
            if (options.key!=undefined){
                this.key = options.key;
            }else{
                this.key = "Id";
            }

            if (options.keyType!=undefined){
                this.keyType = options.keyType;
            }else{
                this.keyType = "Int32";
            }
        }
    }















}
