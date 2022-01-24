import { ITextAreaInitilizedArgs } from "./itext-area-initialized-args";
import { ITextAreaValueChangedArgs } from "./itext-area-value-changed-args";

    export interface ITextAreaEditorOptions{

        width?: number|string|Function;
        height?: number|string|Function;
        maxWidth?: number|string;
        maxHeight?: number|string;
        isValid?:boolean;
        placeholder?:string;
        readOnly?:boolean;
        visible?:boolean;
        disabled?:boolean;
        validationMessageModel?:string;
        stylingMode?:string;
        value?:string;
        maxLenght?:number;
          
        onValueChanged?:(args:ITextAreaValueChangedArgs)=>void;
        onInitilized?:(args:ITextAreaInitilizedArgs)=>void;

    }