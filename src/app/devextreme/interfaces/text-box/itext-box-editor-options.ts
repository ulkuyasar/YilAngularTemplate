import DevExpress from "devextreme";
import { ITextBoxContentReadyArgs } from "./itext-box-content-ready-args";
import { ITextBoxInitilizeArgs } from "./itext-box-initialize-args";
import { ITextBoxValueChangedArgs } from "./itext-box-value-changed-args";

    export interface ITextBoxEditorOptions{
        
        mask?:string;
        maskRules?:Object;
        maskInvalidMessage?:string;
        maxLenght?: number;
        format?:DevExpress.ui.Format;
        useMaskedValue?:boolean;
        isValid?:boolean;
        placeholder?:string;
        readonly?:boolean;
        visible?:boolean;
        value?:string;
        disabled?:boolean;
        width?: string;
        height?: string;
        validationMessageModel?:string;
        mode?:string;
        valueChangeEvent?:string;
        stylingMode?:string;

        onValueChanged?:(args:ITextBoxValueChangedArgs)=>void;
        onInitilized?:(args:ITextBoxInitilizeArgs)=>void;
        onContentReady?:(args:ITextBoxContentReadyArgs)=>void;
        onEnterKey?: () => void;      

    }