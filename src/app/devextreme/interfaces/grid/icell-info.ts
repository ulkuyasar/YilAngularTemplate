import { ICellElement } from "./icell-element";
import { IColumnOptions } from "./icolumn-options";
import { IRowInfo } from "./irow-info";

    export interface ICellInfo<TData=any,TValue=any>{
        cellElement?:ICellElement;
        column?:IColumnOptions;
        columnIndex?:number;
        data?:TData;
        displayValue?:any;
        isEditing?:boolean;
        oldValue?:any;
        row?:IRowInfo;
        rowType?:string;
        rowIndex?:number;
        summeryItems?:any;
        text?:string;
        value?:TValue;

    }