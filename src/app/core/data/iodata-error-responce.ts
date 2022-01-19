import { IODataError } from "./iodata-error";

export interface IODataErrorResponce{
    errorDetails?:IODataError;
    httpStatus:number;
    message?:string;
}

