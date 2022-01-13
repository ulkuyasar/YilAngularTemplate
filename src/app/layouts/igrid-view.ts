import { DxoEditingComponent } from "devextreme-angular/ui/nested";
import { ListComponent } from "../core/components/list-component";
import { QueryStringParam } from "../core/data/query-string-param";
import { GridCellButtonsHostComponent } from "./grid-cell-buttons-host/grid-cell-buttons-host.component";
import { GridCellButtonsComponent } from "./grid-cell-buttons/grid-cell-buttons.component";
import { GridEditMode } from "./grid-view/grid-edit-mode.enum";


export interface IGridView{
    useRoute:boolean;
    parentListComponent:ListComponent;

    keyExpr:string;
    editMode:GridEditMode;

    editing:DxoEditingComponent;
    permanentFilters:Array<QueryStringParam>;

    getCurrentItem<T=object>():T;
    getSelectedItems<T=object>():T[];

    clearSelection():void;
    refreshData():Promise<void> & JQueryPromise<void>;
    showColumnChooser():void;
    exportToExcel(selectedRows:boolean):void;
    getSelectedRowKeys<T=object>():T[];
    getSelectedRowsData<T=object>():T[];
    getRowIndexByKey(key:any):number;
    getCurrentRowIndex():number;
    selectRowsByIndexes(rowIndex:number | number[]):Promise<void> & JQueryPromise<void>;
    selectRowsByKeys(rowIndex:any | any[],preserve:boolean):Promise<void> & JQueryPromise<void>;

    getCellButtons(rowIndex:number):GridCellButtonsHostComponent;
    getCurrentCellButtons():GridCellButtonsHostComponent;

    newItem():void;
    editItem():void;
    deleteItem():void;

}