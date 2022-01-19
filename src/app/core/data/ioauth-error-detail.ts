export interface IOAuthErrorDetail{
    error?:string;
    error_description?:string;
}

export function isOAuthErrorDetail(arg:any):arg is IOAuthErrorDetail{
    return arg.hasOwnProperty('error') && arg.hasOwnProperty('error_description'); 
}
