import { INumberBoxInitilizeArgs } from "./inumber-box-initialize-args";
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
        placeholder?:string;
        readonly?:boolean;
        width?: string;
        showSpinButtons?:boolean;
        showClearButtons?:boolean;

        onValueChanged?:(args:INumberBoxValueChangedArgs)=>void;
        onInitilized?:(args:INumberBoxInitilizeArgs)=>void;
        onEnterKey?: () => void;      
    }