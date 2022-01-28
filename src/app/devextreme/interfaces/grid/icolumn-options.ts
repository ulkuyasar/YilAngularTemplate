
import DevExpress from "devextreme/bundles/dx.all";

    export interface IColumnOptions{
        alignment?:string;
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
        autoExpandGroup?:boolean;
        caption?:string;
        cellTemplate?:DevExpress.ui.template;
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
        format?:DevExpress.ui.format;
        groupIndex?:number;
        minWidth?:number;
        name?:string;
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
