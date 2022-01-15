import { ErrorDetail } from "./error-detail";
import { ErrorSource } from "./error-source.enum";

export class ErrorMessage{
    source:ErrorSource;
    httpStatus?:number;
    url?:string;
    message?:string;
    error?:ErrorDetail;
    errorBody?:any;
}