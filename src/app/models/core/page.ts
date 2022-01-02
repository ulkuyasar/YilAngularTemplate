import { ColumnType } from "../enums/column-type.enum";

export interface IPage<T>{
    Data: T[];
    Count: number;
}

export class PageRequest {
    constructor(public page:number, public limit:number, public order:string,public isAssencding:boolean){}
}

export class Column {
    constructor(public name:string, public text:string, public sort:string,
            public columnType:ColumnType = ColumnType.String,public cssClass:string="",
            public link:string ="", public isNeedTranslation:boolean=false,
            public showOnDelete:boolean=false,public tooltipType:TooltipType.None){}

    get isPulledRight():boolean{
        return this.columnType === ColumnType.Number || this.columnType === ColumnType.Date; 
    }

}

export class PageOption {
    constructor(public columns:Column[], public page:IPage<any>, public showSelectAll:boolean = true){}
}
