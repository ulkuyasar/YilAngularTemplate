import { ITabPanel } from "./itab-panel";
import { ITabPanelDataSource } from "./itab-panel-data-source";

export interface ITabPanelComponent {
    option?:(optionName:string,value?:any)=>any;
    getDataSource?:()=>ITabPanelDataSource;
    selectItem?:(tabPanel:ITabPanel)=>void;
}