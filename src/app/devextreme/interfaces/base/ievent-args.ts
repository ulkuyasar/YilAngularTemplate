import { IComponent } from "./icomponent";
import { IElement } from "./ielement";

    export interface IEventArgs<TComponent extends IComponent = IComponent,TElement extends IElement=IElement>{
        component?:TComponent;
        element?:TElement;

    }