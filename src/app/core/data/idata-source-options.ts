import { HttpMethod, IDataBeforeSendOptions } from "./iodata-before-send-options";
import { QueryStringParam } from "./query-string-param";

export interface IDataSourceOptions{
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

}
