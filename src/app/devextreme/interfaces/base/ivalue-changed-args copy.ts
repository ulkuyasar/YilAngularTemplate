import { Model } from "src/app/core/models/model";
import { EnumModel } from "src/app/models/core/enum-model";
import { IComponent } from "./icomponent";
import { IElement } from "./ielement";
import { IEventArgs } from "./ievent-args";

    export interface IValueChangedArgs<TValue =any,TComponent extends IComponent = IComponent,TElement extends IElement = IElement> extends IEventArgs<TComponent,TElement>{
        previosValue?:TValue;
        value?:TValue;

    }