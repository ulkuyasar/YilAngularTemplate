import { ISelectBoxPopup } from "./iselect-box-popup";

export interface ISelectBoxComponent {
    _popup?:ISelectBoxPopup;
    option?:(optionName:string,value?:any)=>any;
    reset?:()=>void;
}