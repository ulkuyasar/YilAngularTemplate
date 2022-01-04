import { IExcellDataGridCell } from "./iexcell-data-grid-cell";
import { IExcellFont } from "./iexcell-font";

    export interface ICustimimizeExcelCellOptions<TData=any,TValue=any>{
        horizantalAlignment?:string; // center , centercontinuus distibuted fill general justify left rigjt
        verticalAlignment?:string; // bottom center distibuted justify top
        wrapTextEnabled?:boolean;
        backgroundColor?:string;
        fillPatternType?:string; //darkDown darkGray darkGrid ...
        fillPatternColor?:string;
        font?:IExcellFont;
        value?: string | number | Date;
        numeberFormat?:string;
        gridCell?:IExcellDataGridCell<TData,TValue>;



    }