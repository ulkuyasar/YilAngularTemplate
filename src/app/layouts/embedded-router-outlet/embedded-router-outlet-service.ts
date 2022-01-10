import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PanelViewType } from "src/app/core/component-model/panel-view-type.enum";
import { BaseService } from "src/app/core/services/base-sevice";
import { ComponentHierarchyInfo } from "../component-hierarchy/component-hierarchy-info";
import { ComponentHierarchyService } from "../component-hierarchy/component-hierarchy-service";
import { EmbeddedRouterOutletPanelRef } from "./embedded-router-outlet-panel-ref";
import { EmbeddedRouterOutletPanelComponent } from "./embedded-router-outlet-panel/embedded-router-outlet-panel.component";

@Injectable({providedIn:'root'})
export class EmbeddedRouterOutletService extends BaseService{

    public _map:Map<string,EmbeddedRouterOutletPanelRef>;
    constructor(injector:Injector){
        super(injector);
        this._map = new Map<string,EmbeddedRouterOutletPanelRef>();
    }

    findByOwnerComponent(ownerName:string):EmbeddedRouterOutletPanelRef[]{
        let list: EmbeddedRouterOutletPanelRef[] = [];

        this._map.forEach((value:EmbeddedRouterOutletPanelRef,id:string) => {
            if (value.ownerComponentName === ownerName){
                list.push(value);
            }
            
        });
        return list;
    }


    findByParentComponent(parentName:string):EmbeddedRouterOutletPanelRef[]{
        let list: EmbeddedRouterOutletPanelRef[] = [];

        this._map.forEach((value:EmbeddedRouterOutletPanelRef,id:string) => {
            if (value.parentComponentName === parentName){
                list.push(value);
            }
            
        });
        return list;
    }

    createEmbeddedRouterOutletPanel(viewContainerRef:ViewContainerRef, panelViewType :PanelViewType = PanelViewType.Router, componentName?:string ):EmbeddedRouterOutletPanelRef{
        let injector :Injector = viewContainerRef.injector;
        let activatedRoute:ActivatedRoute = injector.get<ActivatedRoute>(ActivatedRoute);
        let componentHierarchyService:ComponentHierarchyService = injector.get<ComponentHierarchyService>(ComponentHierarchyService);

        let ownerComponentName:string;
        let parentComponentName:string;

        if(panelViewType === PanelViewType.Router){
            let hiearachyInfo: ComponentHierarchyInfo = componentHierarchyService.getRouteInfoByActivatedRoute(activatedRoute);
            ownerComponentName = hiearachyInfo.RouteComponentName;
            parentComponentName = hiearachyInfo.ParentRouteComponentName;

            let existingEmbeddedRouterOutletPanelRef: EmbeddedRouterOutletPanelRef = this.findByOwnerComponent(ownerComponentName).find(value=>value.panelViewType === panelViewType);
            if (existingEmbeddedRouterOutletPanelRef){
                return existingEmbeddedRouterOutletPanelRef;
            }
        }else{
            ownerComponentName= componentName;
            parentComponentName= componentHierarchyService.getRouteComponentName(activatedRoute);
        }

        let componentFactoryResolver: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
        let componentFactory: ComponentFactory<EmbeddedRouterOutletPanelComponent> = componentFactoryResolver.resolveComponentFactory(EmbeddedRouterOutletPanelComponent);
        let componentRef: ComponentRef<EmbeddedRouterOutletPanelComponent> = viewContainerRef.createComponent(componentFactory);
        let componentInstance: EmbeddedRouterOutletPanelComponent = componentRef.instance;

        componentInstance.panelViewType = PanelViewType.Router;
        let embeddedRouterOutletPanelRef : EmbeddedRouterOutletPanelRef = new EmbeddedRouterOutletPanelRef();
        embeddedRouterOutletPanelRef.Id = componentInstance.componentID;
        embeddedRouterOutletPanelRef.panelViewType = PanelViewType.Router;
        embeddedRouterOutletPanelRef.viewContainerRef = viewContainerRef;
        embeddedRouterOutletPanelRef.panelComponentRef = componentRef;
        embeddedRouterOutletPanelRef.ownerComponentName = ownerComponentName;
        embeddedRouterOutletPanelRef.parentComponentName = parentComponentName;
        this._map.set(embeddedRouterOutletPanelRef.Id,embeddedRouterOutletPanelRef);
        return embeddedRouterOutletPanelRef;
    }

    removeEmbeddedRouterOutletPanel(embeddedRouterOutletPanelID:string ){
        if (this._map.has(embeddedRouterOutletPanelID)){
            let embeddedRouterOutletPanelRef: EmbeddedRouterOutletPanelRef = this._map.get(embeddedRouterOutletPanelID);
            if (embeddedRouterOutletPanelRef.panelViewType === PanelViewType.Router){
                let ownedembeddedRouterOutletPanelRefList: EmbeddedRouterOutletPanelRef[] = this.findByParentComponent(embeddedRouterOutletPanelRef.ownerComponentName).filter(value=>value.panelViewType===PanelViewType.Component);
                ownedembeddedRouterOutletPanelRefList.forEach(ownedembeddedRouterOutletPanelRef => {
                    this.DestroyEmbeddedRouterOutletPanel(ownedembeddedRouterOutletPanelRef.Id);
                    this._map.delete(ownedembeddedRouterOutletPanelRef.Id);                   
                });
            }
        }
    }

    public DestroyEmbeddedRouterOutletPanel(embeddedRouterOutletPanelID:string):void{
        if (this._map.has(embeddedRouterOutletPanelID)){
            let embeddedRouterOutletPanelRef:EmbeddedRouterOutletPanelRef = this._map.get(embeddedRouterOutletPanelID);
            embeddedRouterOutletPanelRef.panelComponentRef.destroy();
        }
    }
    
    
}