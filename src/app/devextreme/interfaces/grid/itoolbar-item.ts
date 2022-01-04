import { IToolbarItemOptions } from "./itoolbar-item-options";

    export interface IToolbarItem{
        locateInMenu?:string;
        location?:string;
        name?:string;
        options?:IToolbarItemOptions;
        showText?:string;
        sortIndex?:number;
        visible?:boolean;

    }