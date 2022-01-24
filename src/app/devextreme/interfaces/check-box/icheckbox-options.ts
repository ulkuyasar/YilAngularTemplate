import { ICheckBoxInitilizedArgs } from "./icheckbox-initialized-args";
import { ICheckBoxValueChangedArgs } from "./icheckBox-value-changed-args";

    export interface ICheckBoxOptions{
        value?:boolean;
        text?:string;
        readOnly?:boolean;
        disabled?:boolean;
        visible?:boolean;
        onValueChanged?:(args:ICheckBoxValueChangedArgs)=>void;
        onInitilized?:(args:ICheckBoxInitilizedArgs)=>void;

    }