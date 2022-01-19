import { IODataErrorMessage } from "./iodata-error-message";

export interface IODataError{
    code?:string;
    message?:string | IODataErrorMessage;
}
