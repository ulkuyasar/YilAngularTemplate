import DevExpress from "devextreme";
import { IElementAttributes } from "../base/ielement-attributes";
import { ICalendarEditorOptions } from "../calendar/ibutton-options";
import { IDateBoxInitilizedArgs } from "./idate-box-initialized-args";
import { IDateBoxValueChangedArgs } from "./idate-Box-value-changed-args";

    export interface IDateBoxEditorOptions<>{
        type?:string;
        min?:Date|number|string;
        max?:Date|number|string;
        calendarOptions?:ICalendarEditorOptions;
        inValidDateMessage?:string;
        showClearButton?:boolean;
        focusStateEnabled?:boolean;
        readonly?:boolean;
        disabled?:boolean;
        width?:number|string|Function;
        cssClass?:string;
        height?: number|string|Function;
        placeholder?:string;
        pickerType?:string;
        displayFormat?:DevExpress.ui.Format;
        elementAttr?:IElementAttributes;
        value?:string | number | Date;
        visible?:boolean;

        onValueChanged?:(args:IDateBoxValueChangedArgs)=>void;
        onInitilized?:(args:IDateBoxInitilizedArgs)=>void;
        onEnterKey?:() => void;
    }