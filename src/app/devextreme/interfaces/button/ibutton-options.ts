import { IButtonClickEventArgs } from "./ibutton-click-event-args";
import { IButtonInitilizedArgs } from "./ibutton-initialized-args";

    export interface IButtonOptions{
        type?: "normal" | "default"| "success" | "back" | "danger";
        text?:string;
        hint?:string;
        icon?:string;
        disabled?:boolean;
        width?: number|string|(()=>number|string);
        height?: number|string|(()=>number|string);
        visible?:boolean;      
        useSubmitBehavior?:boolean;
        validationGroup?:string;
        
        onClick?:(args:IButtonClickEventArgs) =>void;
        onInitilized?:(args:IButtonInitilizedArgs) =>void;


    }