import { IRadioGroupInitilizeArgs } from "./iradio-group-initialize-args";
import { IRadioGroupValueChangedArgs } from "./iradio-group-value-changed-args";


    export interface IRadioGroupOptions{
        value?:boolean;
        text?:string;
        datasource?:any;
        layout?:string;      
        onValueChanged?:(args:IRadioGroupValueChangedArgs)=>void;
        onInitilized?:(args:IRadioGroupInitilizeArgs)=>void;

    }