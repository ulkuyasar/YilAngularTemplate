export class Responce{
    HTTPStatus:string;
    Data:any;
    Errors:string[];

    get HasError():boolean{
        return this.Errors.length>0; 
    }
}