import { ITextBoxComponent } from "./itext-box-component";

export interface ITextBoxValueChangedArgs{
    component?:ITextBoxComponent;
    previoslyValue:any;
    value:any;
}