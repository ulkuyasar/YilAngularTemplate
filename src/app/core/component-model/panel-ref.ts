import { ComponentRef, Type, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PanelComponent } from "../components/panel-component";
import { IComponent } from "./icomponent";
import { IPanelInstanceRef } from "./ipanel-instance-ref";
import { IViewContainer } from "./iview-container";
import { PanelViewType } from "./panel-view-type.enum";

export abstract class PanelRef<T extends PanelComponent>{

    Id?:string;
    panelViewType?:PanelViewType;
    viewContainerRef?:ViewContainerRef;
    panelComponentRef?:ComponentRef<T>;
    ownerComponentName?:string;
    parentComponentName?:string;
    currentUrl?:string;

    currentPanelInstanceRef:IPanelInstanceRef;

    getComponent<C>():C{
        let viewContainerObject :object =  this.viewContainerRef as ViewContainerRef;
        let viewContainer:IViewContainer<C> = <IViewContainer<C>>viewContainerObject;

        return viewContainer._data.componentView.component;
    }

    getActivatedRoute():ActivatedRoute{
        return (this.panelComponentRef as ComponentRef<T>).instance.Injector.get<ActivatedRoute>(ActivatedRoute);
    }

}
