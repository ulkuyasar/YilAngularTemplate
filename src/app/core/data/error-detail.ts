
export class ErrorDetail{
    code?:string;
    message?:string;
    messages?:string[];
    language?:string;
    constructor(code?:string,message?:string,messages?:string[] ,language?:string){
        this.code=code;
        this.message=message;
        this.messages=messages;
        this.language=language;
    } 
}