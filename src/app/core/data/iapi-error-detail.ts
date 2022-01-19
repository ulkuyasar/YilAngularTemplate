export interface IApiErrorDetail{
    Code?:string;
    Message:string;
    Messages?:string[];
    Parameters?:string[];
}

export function isApiErrorDetail(arg:any):arg is IApiErrorDetail{
    return arg.hasOwnProperty('Code') && arg.hasOwnProperty('Parameters'); 
}
