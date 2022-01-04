import { ITabPanel } from "./itab-panel";

export interface ITabPanelSelectionChangedArgs{
    addedItems?:ITabPanel[];
    removedItems?:ITabPanel[];

}