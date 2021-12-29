import { IPanelInstanceRef } from "src/app/core/component-model/ipanel-instance-ref";

export interface IPopupRef extends IPanelInstanceRef{
    updatePosition(offset:{x:number,y:number}):void;
}