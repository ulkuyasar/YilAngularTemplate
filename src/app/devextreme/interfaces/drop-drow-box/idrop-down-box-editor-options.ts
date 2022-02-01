
import DevExpress from "devextreme/bundles/dx.all";
import { IDropDownBoxInitilizedArgs } from "./idrop-down-box-initialized-args";
import { IDropDownBoxOpenedEventArgs } from "./idrop-down-box-opened-event-args";
import { IDropDownBoxValueChangedArgs } from "./idrop-down-box-value-changed-args";

    export interface IDropDownBoxEditorOptions{
        disabled?:boolean;
        readonly?:boolean;
        showClearButton?:boolean;
        width?: number|string|Function;
        height?: number|string|Function;
        showDropDrowButton?:boolean;
        dataSource?:DevExpress.data.DataSource;
        valueExpr:string|Function;
        displayExpr:string|Function;
        placeholder?:string;
        value?:string|Function|number;
        contentTemplate?:DevExpress.ui.template;

        onValueChanged?:(args:IDropDownBoxValueChangedArgs)=>void;
        onOpened?:(args:IDropDownBoxOpenedEventArgs)=>void;
        onInitilized?:(args:IDropDownBoxInitilizedArgs)=>void;

    }
