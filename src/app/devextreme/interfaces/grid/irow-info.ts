import { ICellElement } from "./icell-element";
import { ICellInfo } from "./icell-info";

    export interface IRowInfo{
        cells?:ICellInfo;
        data?:any;
        dataIndex?:number;
        isExpanded?:boolean;
        isSelected?:boolean;
        key?:any;
        rowType?:string;
        rowIndex?:number;

    }