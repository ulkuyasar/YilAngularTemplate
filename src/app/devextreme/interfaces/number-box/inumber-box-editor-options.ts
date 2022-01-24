import { INumberBoxInitilizedArgs } from "./inumber-box-initialized-args";
import { INumberBoxValueChangedArgs } from "./inumber-box-value-changed-args";


    export interface INumberBoxEditorOptions{
        
        type?:string;
        disabled?:boolean;
        visible?:boolean;
        format?:string;
        height?: number|string|Function;
        isValid?:boolean;
        isValidValueMessage?:string;
        min?:Date|number|string;
        max?:Date|number|string;
        onKeyPress?:Function;
        onKeyUp?:Function;
        value?:Number;
        placeHolder?:string;
        readOnly?:boolean;
        width?: string;
        showSpinButtons?:boolean;
        showClearButtons?:boolean;

        onValueChanged?:(args:INumberBoxValueChangedArgs)=>void;
        onInitilized?:(args:INumberBoxInitilizedArgs)=>void;
        onEnterKey?: () => void;      
    }