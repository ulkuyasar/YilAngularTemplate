import { ICheckBoxInitilizeArgs } from "./icheckbox-initialize-args";
import { ICheckBoxValueChangedArgs } from "./icheckBox-value-changed-args";

    export interface ICheckBoxOptions{
        value?:boolean;
        text?:string;
        readonly?:boolean;
        disabled?:boolean;
        visible?:boolean;
        onValueChanged?:(args:ICheckBoxValueChangedArgs)=>void;
        onInitilized?:(args:ICheckBoxInitilizeArgs)=>void;

    }