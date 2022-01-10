import DevExpress from "devextreme";
import { StringChain } from "lodash";
import { ICellElement } from "./icell-element";
import { IRowInfo } from "./irow-info";

    export interface IColumnOptions{
        aligment?:string;
        allowEditing?:boolean;
        allowExporting?:boolean;
        allowFiltering?:boolean;
        allowFixing?:boolean;
        allowGrouping?:boolean;
        allowHeaderFiltering?:boolean;
        allowHiding?:boolean;
        allowReordering?:boolean;

        allowResizing?:boolean;
        allowSearch?:boolean;
        allowSorting?:boolean;
        allowExpandGroup?:boolean;
        caption?:string;
        cellTemplate?:DevExpress.ui.Template;
        columns?:IColumnOptions[];
        cssClass?:string;
        dataField?:string;
        dataType?:string;  // string  number date boolean pbject  datetime 
        falseText?:string;
        filterOperations?:string[];  // =  <> <  > <=  >= notcontains
        fitterType?:string;
        fitterValue?:any;
        fitterValues?:any[];
        fixed?:boolean;
        fixedPosition?:string;  //left right
        format?:DevExpress.ui.Format;
        groupIndex?:number;
        minWidth?:number;
        name?:StringChain;
        showInColumnChooser?:boolean;
        showWhenGrouped?:boolean;
        sortIndex?:number;
        sortOrder?:string;   // undefined  asc   desc
        trueText?:string;
        type?:string;
        visible?:boolean;
        visibleIndex?:number;
        width?:number|string;

    }