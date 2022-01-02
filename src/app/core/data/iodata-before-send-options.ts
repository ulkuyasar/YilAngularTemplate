export interface IDataBeforeSendOptions{
    async?:boolean;
    method?:HttpMethod;
    timeout?:number;
    payload?:any;
    headers?:any;
}

export type HttpMethod = "GET" | "get" | "Get" | "POST" | "post" | "Post"| "PUT" | "put" | "Put"