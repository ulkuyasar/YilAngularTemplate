import { QueryStringParam } from "./query-string-param";

export interface IUrlOptions{
    controller?:string;
    action?:string;
    id?:any;
    addLangQueryString?:boolean;
    queryParams?:Array<QueryStringParam>;
    isOdata?:boolean;
    useViewModel?:boolean;
    expands?:string[];
    skipAuthorization?:boolean; // sadece get methodlarında

}
