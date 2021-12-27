export interface IPage<T>{
    Data: T[];
    Count: number;
}

export class PageRequest {
    constructor(public page:number, public limit:number, public order:string,public isAssencding:boolean){}
}

export class Column {
    constructor(public name:string, public text:string, public sort:string,
               public columnType:ColumnType = ColumnType.String,public cssClass:string="",){}
