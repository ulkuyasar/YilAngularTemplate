
import DevExpress from "devextreme/bundles/dx.all";
import { Model } from "src/app/core/models/model";
import { EnumModel } from "src/app/models/core/enum-model";
import { ISelectBoxCustomCreatingArgs } from "./iselect-box-custom-creating-args";
import { ISelectBoxInitilizedArgs } from "./iselect-box-initialized-args";
import { ISelectBoxOpenedEventArgs } from "./iselect-box-opened-event-args";
import { ISelectBoxSelectionChangedArgs } from "./iselect-box-selection-changed-args";
import { ISelectBoxValueChangedArgs } from "./iselect-box-value-changed-args";



    export interface ISelectBoxEditorOptions<T extends Model|EnumModel>{
        disabled?:boolean;
        readOnly?:boolean;
        visible?:boolean;
        width?: number|string|Function;
        height?: number|string|Function;
        showClearButton?:boolean;
        showDropDrowButton?:boolean;
        acceptCustomValue?:boolean;
        dataSource?:DevExpress.data.DataSource;
        valueExpr:string|Function;
        displayExpr:string|Function;
        searchEnabled?:boolean;
        searchMode?:string;
        searchTimeout?:number;
        searchExpr?:string|Function;
        minSearchLength?:number;
        showDataBeforeSearch?:boolean;
        noDataText?:string;
        itemTemplate?:string;
        placeholder?:string;
        value?:string|Function|number;

        onValueChanged?:(args:ISelectBoxValueChangedArgs)=>void;
        onSelectionChanged?:(args:ISelectBoxSelectionChangedArgs<T>)=>void;
        onOpened?:(args:ISelectBoxOpenedEventArgs)=>void;
        onInitilized?:(args:ISelectBoxInitilizedArgs)=>void;
        onCustomItemCreating?:(args:ISelectBoxCustomCreatingArgs)=>void;
        onEnterKey?:()=>void;
    }
