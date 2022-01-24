import { ITabPanelContentReadyArgs } from "./itab-panel-content-ready-args";
import { ITabPanelInitilizedArgs } from "./itab-panel-initialized-args";
import { ITabPanelItemClickArgs } from "./itab-panel-item-click-args";
import { ITabPanelSelectionChangedArgs } from "./itab-panel-item-selection-changed-args";
import { ITabPanelTitleClickArgs } from "./itab-panel-title-click-args";

    export interface ITabPanelOptions{
 
        deferRendering?:boolean;
        width?: number|string|Function;
        height?: number|string|Function;
        loop?:boolean;
        selectedIndex?:number;
        selectedItem?:object;
        showNavButtons?:boolean;
        swipsEnabled?:boolean;
        animationEnabled?:boolean;
        scrollByContent?:boolean;
        scrollingEnabled?:boolean;

        onItemClick?:(args:ITabPanelItemClickArgs)=>void;
        onSelectionChanged?:(args:ITabPanelSelectionChangedArgs)=>void;
        onTitleClick?:(args:ITabPanelTitleClickArgs)=>void;
        onInitilized?:(args:ITabPanelInitilizedArgs)=>void;
        onContentReady?:(args:ITabPanelContentReadyArgs)=>void;

    }