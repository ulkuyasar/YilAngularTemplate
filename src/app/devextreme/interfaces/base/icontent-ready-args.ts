import { IComponent } from "./icomponent";
import { IElement } from "./ielement";
import { IEventArgs } from "./ievent-args";

export interface IContentReadyArgs<TComponent extends IComponent = IComponent,TElement extends IElement=IElement> extends
                            IEventArgs<IComponent,TElement>{}