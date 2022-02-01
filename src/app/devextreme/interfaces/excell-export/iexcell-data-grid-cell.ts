import { IColumnOptions } from "../grid/icolumn-options";

    export interface IExcellDataGridCell<TData=any,TValue=any>{
        column?:IColumnOptions;
        data?:TData;
        rowType?:string;
        value:TValue;
    }
