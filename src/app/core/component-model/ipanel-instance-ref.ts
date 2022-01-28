import { Observable, Subscriber } from "rxjs";
import { BaseComponent } from "../components/base-component";

export interface IPanelInstanceRef{

    panelComponentID:string;
    containerDivID:string;
    alwaysReturn:boolean;

    beforeOpenedSubscriber:Subscriber<any>;
    afterOpenedSubscriber:Subscriber<any>;
    beforeClosedSubscriber:Subscriber<any>;
    afterClosedSubscriber:Subscriber<any>;

    beforeOpened():Observable<any>;
    afterOpened():Observable<any>;
    beforeClosed():Observable<any>;
    afterClosed():Observable<any>;
    close():void;

    updateTitle(title:string):void;
    updateSize(size :{ width?:number | string | Function, height?:number | string | Function, }):void;

    getComponentInstance():BaseComponent;

}
