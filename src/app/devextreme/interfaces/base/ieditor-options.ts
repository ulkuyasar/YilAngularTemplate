import DevExpress from "devextreme/bundles/dx.all";
import { IComponent } from "./icomponent";
import { IElementAttributes } from "./ielement-attributes";
import { IInitilizedArgs } from "./iinitilized-args";
import { IValueChangedArgs } from "./ivalue-changed-args copy";

export interface IEditorOptions<TComponent extends IComponent=IComponent,TValue=any> {

    disabled?:boolean,
    readonly?:boolean,
    width?:number|string|Function,
    height?:number|string|Function,
    isValid?:boolean,
    displayFormat?:DevExpress.ui.format,
    cssClass?:string,
    placeholder?:string,
    elementAttr?:IElementAttributes,


    onInilitialized?:(args:IInitilizedArgs<TComponent>) =>void;
    onContentReady?:(args:IInitilizedArgs<TComponent>) =>void;
    onValueChanged?:(args:IValueChangedArgs<TComponent,TValue>) =>void;

}
