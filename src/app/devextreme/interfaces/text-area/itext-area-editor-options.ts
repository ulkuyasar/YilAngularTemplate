import { ITextAreaInitilizeArgs } from "./itext-area-initialize-args";
import { ITextAreaValueChangedArgs } from "./itext-area-value-changed-args";

    export interface ITextAreaEditorOptions{

        width?: number|string|Function;
        height?: number|string|Function;
        maxWidth?: number|string;
        maxHeight?: number|string;
        isValid?:boolean;
        placeholder?:string;
        readonly?:boolean;
        visible?:boolean;
        disabled?:boolean;
        validationMessageModel?:string;
        stylingMode?:string;
        value?:string;
          
        onValueChanged?:(args:ITextAreaValueChangedArgs)=>void;
        onInitilized?:(args:ITextAreaInitilizeArgs)=>void;

    }