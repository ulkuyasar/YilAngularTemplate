import { INumberBoxComponent } from "./inumber-box-component";

export interface INumberBoxValueChangedArgs{
    component?:INumberBoxComponent;
    previoslyValue:any;
    value:any;
}