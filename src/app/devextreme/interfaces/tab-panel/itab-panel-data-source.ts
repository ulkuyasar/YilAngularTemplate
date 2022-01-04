import { ITabPanel } from "./itab-panel";

export interface ITabPanelDataSource{
    items?:()=>ITabPanel[];

}