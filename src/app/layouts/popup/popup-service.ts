import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injector, Type, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { IComponent } from "src/app/core/component-model/icomponent";
import { IPanelInstanceRef } from "src/app/core/component-model/ipanel-instance-ref";
import { IReturnValue } from "src/app/core/component-model/ireturn-value";
import { PanelViewType } from "src/app/core/component-model/panel-view-type.enum";
import { BaseComponent } from "src/app/core/components/base-component";
import { IListComponent } from "src/app/core/components/ilist-component";
import { PageComponent } from "src/app/core/components/page-component";
import { BaseService } from "src/app/core/services/base-sevice";
import { ComponentHierarchyInfo } from "../component-hierarchy/component-hierarchy-info";
import { ComponentHierarchyService } from "../component-hierarchy/component-hierarchy-service";
import { IPopupOptions } from "./ipopup-options";
import { PopupOptions } from "./popup-options";
import { PopupPanelRef } from "./popup-panel-ref";
import { PopupRef } from "./popup-ref";

export class PopupService extends BaseService{
    private _map: Map<string,PopupPanelRef>;
    private _isInNavigation:boolean = false; // yasar

    constructor(injector:Injector){
        super(injector);
        this._map = new Map<string,PopupPanelRef>();

        let router : Router = injector.get<Router>(Router);
        router.events.subscribe(event=>{
            if(event instanceof NavigationStart){
                this._isInNavigation=true;
            }else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
                this._isInNavigation=false;
            }
        });
    }

    private get openedPanelCount():number{
        let openedCount:number = 0;
        this._map.forEach((item:PopupPanelRef,key:string)=>{
            if(item.panelComponentRef.instance.isOpened === true){
                openedCount++;
            }
        });
        return openedCount;
    }

    private open(popupPanelInstance:PopupPanelComponent,options?:Partial<IPopupOptions>){
        let defaultPopupOptions:PopupOptions = new PopupOptions();
        let popupOptions = { ...defaultPopupOptions, ...options };

        if(popupPanelInstance.panelViewType === PanelViewType.Component){
            this.initiliaze(popupPanelInstance,popupOptions);
            popupPanelInstance.open();
        }else{

            let internal = setInterval(() => {
                if (popupPanelInstance.initalizeContentTemplate ===false){
                    this.initilize(popupPanelInstance,popupOptions);
                    popupPanelInstance.open();
                    clearInterval(interval);
                }else{
                    clearInterval(interval);
                }


            },10);
        }
    }

    private initialize(popupPanelInstance:PopupPanelComponent,options:PopupOptions){
        if (options.Title != undefined){
            popupPanelInstance.title = options.Title;
        }

        if (options.Width != undefined){
            popupPanelInstance.width = options.Width;
        }

        if (options.MinWidth != undefined){
            popupPanelInstance.minWidth = options.MinWidth;
        }

        if (options.MaxWidth != undefined){
            popupPanelInstance.maxWidth = options.MaxWidth;
        }else{
            popupPanelInstance.maxWidth = "calc(100% - 40px)";
        }

        if (options.Height != undefined){
            popupPanelInstance.height = options.Height;
        }

        if (options.MinHeight != undefined){
            popupPanelInstance.minHeight = options.MinHeight;
        }

        if (options.MaxHeight != undefined){
            popupPanelInstance.maxHeight = options.MaxHeight;
        }else{
            popupPanelInstance.maxHeight = "90%";
        }

        if (options.Position != undefined){
            popupPanelInstance.position = options.Position;
        }else{
            let count:number = this.openedPanelCount;
            let offsetX:number = count*15;
            let offsetY:number = (count*15)+55;
            let offset:number = `-${offsetX} ${offsetY}`;
            popupPanelInstance.position = {my:'top',at:'top',of:window,offset:offset};
        }

        if (options.ShowTitle != undefined){
            popupPanelInstance.showTitle = options.ShowTitle;
        }

        if (options.FullScreen != undefined){
            popupPanelInstance.fullScreen = options.FullScreen;
        }

        if (options.ResizeEnabled != undefined){
            popupPanelInstance.resizeEnabled = options.ResizeEnabled;
        }

        if (options.Shading != undefined){
            popupPanelInstance.shading = options.Shading;
        }

        if (options.ShadingColor != undefined){
            popupPanelInstance.shadingColor = options.ShadingColor;
        }

        if (options.ShowCloseButton != undefined){
            popupPanelInstance.showCloseButton = options.ShowCloseButton;
        }

        if (options.CloseOnOutsideClick != undefined){
            popupPanelInstance.closeOnOutsideClick = options.CloseOnOutsideClick;
        }

        if (options.DragEnabled != undefined){
            popupPanelInstance.dragEnabled = options.DragEnabled;
        }

        if (options.ContainerElement != undefined){
            popupPanelInstance.containerElement = options.ContainerElement;
        }

        if (options.ElementAttr != undefined){
            popupPanelInstance.elementAttr = options.ElementAttr;
        }

        if (options.MgClass != undefined){
            popupPanelInstance.mgClass = options.MgClass;
        }
    }

    private findByOwnerComponent(ownerName:string):PopupPanelRef[]{

        let list: PopupPanelRef[] = [];
        this._map.forEach((value:PopupPanelRef,id:string) =>{
            if (value.ownerComponentName === ownerName){
                list.push(value);
            }
        });
        return list;
    }

    private findByParentComponent(parentName:string):PopupPanelRef[]{
        let list: PopupPanelRef[] = [];
        this._map.forEach((value:PopupPanelRef,id:string) =>{
            if (value.parentComponentName === parentName){
                list.push(value);
            }
        });
        return list;
    }

    private findByOwnerAndParentComponent(ownerName:string,parentName:string):PopupPanelRef[]{
        let list: PopupPanelRef[] = [];
        this._map.forEach((value:PopupPanelRef,id:string) =>{
            if (value.parentComponentName === parentName && value.ownerComponentName === ownerName){
                list.push(value);
            }
        });
        return list;
    }

    private getByPopupPanelID(popupPanelID:string):PopupPanelRef{
        return this._map.get(popupPanelID) as PopupPanelRef;
    }

    openGlobalPopupWithComponent<T extends BaseComponent>(componentRef:ComponentRef<T>,options?: Partial<IPopupOptions>): PopupRef<T>{
        let componentHierarchyService : ComponentHierarchyService = this.Injector.get<ComponentHierarchyService>(ComponentHierarchyService);
        let rootHierarchyInfo: ComponentHierarchyInfo = componentHierarchyService.RootComponentHierarchyInfo;
        return this.openPopupWithComponent<T>(componentRef,rootHierarchyInfo.ComponentInstance?.viewContainerRef,options);

    }

    openPopupWithComponent<T extends BaseComponent>(componentRef:ComponentRef<T>,viewContainerRef:ViewContainerRef,options?: Partial<IPopupOptions>): PopupRef<T>{

        let popupPanelRef:PopupPanelRef = this.createPopupPanel(viewContainerRef,PanelViewType.Component, componentRef.componentType.name);
        let popupPanelInstance : PopupPanelComponent = popupPanelRef.panelComponentRef.instance;

        popupPanelInstance.componentContainer.insert(componentRef.hostView);

        let componentInstance: T = componentRef.instance;

        let popupRef: PopupRef<T> = new  PopupRef<T>(this); 
        popupRef.panelComponentID = popupPanelInstance.componentID;
        popupRef.containerDivID = popupPanelInstance.containerDivID;
        popupRef.componentInstance = popupPanelInstance.componentInstance;

        componentInstance.useRoute = false;
        componentInstance.panelInstanceRef = popupRef;

        popupPanelRef.currentPanelInstanceRef = popupRef;
        this.open(popupPanelInstance, options);
        return popupRef;

    }

    openGlobalPopupWithComponentType<T extends BaseComponent>(componentType:Type<T>,options?:Partial<IPopupOptions>,afterCreaterComponentAction?:yasarrrrrr){
        let componentHierarchyService : ComponentHierarchyService = this.Injector.get<ComponentHierarchyService>(ComponentHierarchyService);
        let rootHierarchyInfo: ComponentHierarchyInfo = componentHierarchyService.RootComponentHierarchyInfo; 
        return this.openPopupWithComponentType<T>(componentType,rootHierarchyInfo.ComponentInstance?.viewContainerRef,options,afterCreaterComponentAction);
    }

    openPopupWithComponentType<T extends BaseComponent>(componentType:Type<T>,viewContainerRef: ViewContainerRef, options?:Partial<IPopupOptions>,afterCreaterComponentAction?:yasarrrrrr){

        let popupPanelRef:PopupPanelRef = this.createPopupPanel(viewContainerRef,PanelViewType.Component, componentType.name);
        let popupPanelInstance : PopupPanelComponent = popupPanelRef.panelComponentRef.instance;

        let componentFactory: ComponentFactory<T> = popupPanelInstance.componentFactoryResolver.resolveComponentFactory(componentType);
        let componentRef : ComponentRef<T> =  popupPanelInstance.componentContainer.createComponent(componentFactory);
        let componentInstance:T = componentRef.instance;

        let popupRef: PopupRef<T> = new PopupRef<T>(this);
        popupRef.panelComponentID = popupPanelInstance.componentID;
        popupRef.containerDivID = popupPanelInstance.containerDivID;
        popupRef.componentInstance = componentInstance;

        componentInstance.useRoute = false;
        componentInstance.panelInstanceRef = popupRef;

        popupPanelRef.currentPanelInstanceRef = popupRef;

        if (afterCreaterComponentAction){
            afterCreaterComponentAction(componentInstance);
        }
        this.open(popupPanelInstance, options);
        return popupRef;
    }

    openPopupInRouter<T extends PageComponent>(hiearachyInfo: ComponentHierarchyInfo,options?:Partial<IPopupOptions>):PopupRef<T>{

        let parentPopupPanelRef:PopupPanelRef = this.findByOwnerComponent(hiearachyInfo.ParentRouteComponentName  yasarrrrr);  271.satır
        let popupPanelInstance : PopupPanelComponent = parentPopupPanelRef.panelComponentRef.instance;

        let componentHierarchyService:ComponentHierarchyService = parentPopupPanelRef.viewContainerRef.     274.satır

        let activatedRoute: ActivatedRoute = parentPopupPanelRef.getActivatedRoute();
        let currentUrl:string = componentHierarchyService.calculateUrl(activatedRoute);
        parentPopupPanelRef.currentUrl = currentUrl;

        let ownedPopupPanelRef:PopupPanelRef= this.findByOwnerAndParentComponent(hiearachyInfo  yasarrrrr);  280.satır
        let componentInstance : T = ownedPopupPanelRef.getComponent<T>();
        let componentName = componentInstance.Instance.getClassName();

        let popupRef: PopupRef<T> = new PopupRef<T>(this);
        popupRef.panelComponentID = popupPanelInstance.componentID;
        popupRef.containerDivID = `#Div_{componentName}_Router_Outlet`;
        popupRef.componentInstance = componentInstance;

        componentInstance.useRoute = true;
        componentInstance.panelInstanceRef = popupRef;

        parentPopupPanelRef.currentPanelInstanceRef = popupRef;

        if (popupPanelInstance.isOpened === false){
            this.open(popupPanelInstance, options);
        }
        popupRef.alwaysReturn = true;
        popupRef.afterClosed().subscribe(
            ()=> {
                let parentComponentInstance:IListComponent = parentPopupPanelRef.getComponent    
                301.satır to 304
            });

        return popupRef;
    }

    createPopupPanel(viewContainerRef: ViewContainerRef,panelViewType : PanelViewType = PanelViewType.Component,componentName?:string):PopupPanelRef{

        let injector:Injector = viewContainerRef.injector;
        let activatedRoute : Router = injector.get<ActivatedRoute>(ActivatedRoute);
        let componentHierarchyService : ComponentHierarchyService = this.Injector.get<ComponentHierarchyService>(ComponentHierarchyService);
        
        let ownerComponentName:string;
        let parentComponentName:string;

        if (panelViewType === PanelViewType.Router){
            let rootHierarchyInfo: ComponentHierarchyInfo = componentHierarchyService.getRouteInfoByActivatedRoute(activatedRoute); 
             ownerComponentName= rootHierarchyInfo.RouteComponentName;
             parentComponentName= rootHierarchyInfo.ParentRouteComponentName;
        
            let existingPopupPanelRef:PopupPanelRef = this.findByOwnerComponent(ownerComponentName).find(value => value.panelViewType === panelViewType);
            if (existingPopupPanelRef){
                return existingPopupPanelRef;
            }
        }else{
            ownerComponentName= componentName;
            parentComponentName= componentHierarchyService.getRouteComponentName(activatedRoute);
        }

        let componentFactoryResolver:ComponentFactoryResolver = injector.get<ComponentFactoryResolver>(ComponentFactoryResolver);
        let componentFactory:ComponentFactory<PopupPanelComponent> = componentFactoryResolver.resolveComponentFactory(PopupPanelComponent);
        let componentRef: ComponentRef<PopupPanelComponent> = viewContainerRef.createComponent(componentFactory);
        let componentInstance :PopupPanelComponent= componentRef.instance;

        componentInstance.panelViewType = panelViewType;
        componentInstance.showingEvent.subscribe((args:any)=> this.beforeOpened(componentInstance.componentID,args));
        componentInstance.shownEvent.subscribe((args:any)=> this.afterOpened(componentInstance.componentID,args));
        componentInstance.hidingEvent.subscribe((args:any)=> this.beforeClosed(componentInstance.componentID,args));
        componentInstance.closeEvent.subscribe((popupContainerID:string)=> this.close(popupContainerID));
        componentInstance.hiddenEvent.subscribe((args:any)=> this.afterClosed(componentInstance.componentID,args));

        let popupPanelRef: PopupPanelRef = new PopupPanelRef();

        popupPanelRef.Id = componentInstance.componentID;
        popupPanelRef.panelViewType = componentInstance.panelViewType;
        popupPanelRef.viewContainerRef = componentInstance.viewContainerRef;
        popupPanelRef.panelComponentRef = componentInstance.panelComponentRef;
        popupPanelRef.ownerComponentName = componentInstance.ownerComponentName;
        popupPanelRef.parentComponentName = componentInstance.parentComponentName;

        this._map.set(popupPanelRef.Id,popupPanelRef);
        return popupPanelRef;
    }

    removePopupPanel(popupPanelID:string){
        if(this._map.has(popupPanelID)){
            let popupPanelRef:PopupPanelRef = this._map.get(popupPanelID);

            if(popupPanelRef.panelViewType === PanelViewType.Router){
                let parentpopupPanelRef: PopupPanelRef = this.findByOwnerComponent(popupPanelRef.parentComponentName).find(value=>value.parentViewType ===PanelViewType.Router );
                if(parentpopupPanelRef && parentpopupPanelRef.panelComponentRef.Instance.isOpened === true){
                    parentpopupPanelRef.panelComponentRef.Instance.close();
                }
            }

            let ownedPopupPanelRefList: PopupPanelRef[] = this.findByParentComponent(popupPanelRef.ownerComponentName).filter(value=>value.panelViewType ===PanelViewType.Component);
            ownedPopupPanelRefList.forEach(ownedPopupPanelRef => {
                ownedPopupPanelRef.panelComponentRef.Instance.cpmponentContainer.clear();
                this.destroyPopupPanel(ownedPopupPanelRef.Id);
                this._map.delete(ownedPopupPanelRef.Id);
            });

            this.destroyPopupPanel(popupPanelID);
            this._map.delete(popupPanelID);

        }
    }
    private destroyPopupPanel(popupPanelID: string):void {
        if(this._map.has(popupPanelID)){     
            let popupPanelRef:PopupPanelRef = this._map.get(popupPanelID);
            popupPanelRef.panelComponentRef.destroy();
        }
    }

    private getReturnValue(popupPanelInstanceRef:IPanelInstanceRef):void {
        let returnValue:any;
        let component:IComponent = <IComponent>popupPanelInstanceRef.getComponentInstance();
        if (component && component.hasOwnProperty('returnValue')){
                let componentObject:object = component;
                returnValue = (<IReturnValue<any>>componentObject).returnValue;
        }
        return returnValue;
    }

    private beforeOpened = (popupPanelId:string ,args:any)=> {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        let popupPanelInstanceRef : IPanelInstanceRef = popupPanelRef.currentPanelInstanceRef;

        if (popupPanelInstanceRef && popupPanelInstanceRef.beforeOpenedSubscriber){
            let returnValue :any = this.getReturnValue(popupPanelInstanceRef); 
            if (returnValue){
                popupPanelInstanceRef.beforeOpenedSubscriber.next(returnValue);
            }else if (popupPanelInstanceRef.alwaysReturn){
                popupPanelInstanceRef.beforeOpenedSubscriber.next();
            }
        }
    }

    private afterOpened = (popupPanelId:string ,args:any)=> {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        let popupPanelInstanceRef : IPanelInstanceRef = popupPanelRef.currentPanelInstanceRef;

        if (popupPanelInstanceRef && popupPanelInstanceRef.afterOpenedSubscriber){
            let returnValue :any = this.getReturnValue(popupPanelInstanceRef); 
            if (returnValue){
                popupPanelInstanceRef.afterOpenedSubscriber.next(returnValue);
            }else if (popupPanelInstanceRef.alwaysReturn){
                popupPanelInstanceRef.afterOpenedSubscriber.next();
            }
        }
    }

    private beforeClosed = (popupPanelId:string ,args:any)=> {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        let popupPanelInstanceRef : IPanelInstanceRef = popupPanelRef.currentPanelInstanceRef;

        if (popupPanelInstanceRef && popupPanelInstanceRef.beforeClosedSubscriber){
            let returnValue :any = this.getReturnValue(popupPanelInstanceRef); 
            if (returnValue){
                popupPanelInstanceRef.beforeClosedSubscriber.next(returnValue);
            }else if (popupPanelInstanceRef.alwaysReturn){
                popupPanelInstanceRef.beforeClosedSubscriber.next();
            }
        }
    }

    private afterClosed = (popupPanelId:string ,args:any)=> {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        let popupPanel:PopupPanelComponent = popupPanelRef.panelComponentRef.Instance;
        let popupPanelInstanceRef : IPanelInstanceRef = popupPanelRef.currentPanelInstanceRef;

        if (popupPanelInstanceRef && popupPanelInstanceRef.afterClosedSubscriber){
            let returnValue :any = this.getReturnValue(popupPanelInstanceRef); 
            if (returnValue){
                popupPanelInstanceRef.afterClosedSubscriber.next(returnValue);
            }else if (popupPanelInstanceRef.alwaysReturn){
                popupPanelInstanceRef.afterClosedSubscriber.next();
            }
        }

        if(popupPanelRef.panelViewType === PanelViewType.Router){
            if (this._isInNavigation===false){
                let router:Router = popupPanel.Injector.get<Router>(Router);
                router.navigate(popupPanelRef.currentUrl);
            } else {
                popupPanel.componentContainer.clear();
                this.removePopupPanel(popupPanelID);
            }
        }       
    }

    public close(popupPanelId:string ):void {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        if(popupPanelRef){
            if(popupPanelRef.panelComponentRef.instance.isOpened === true){
                popupPanelRef.panelComponentRef.instance.close();
            }
        }
    }

    public updatePosition(popupPanelId:string, offset:{x:number,y:number} ):void {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        if(popupPanelRef){
            let _offset:string = `${offset.x} ${offset.y}`
            popupPanelRef.panelComponentRef.instance.position = {my:'top',at:'top',of:window,offset:_offset};
        }
    }

    public updateSize(popupPanelId:string, size:{width?:number|string|Function, height?:number|string|Function} ):void {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        if(popupPanelRef){
            if (size.width){
                popupPanelRef.panelComponentRef.instance.width = size.width;
            }
            if (size.height){
                popupPanelRef.panelComponentRef.instance.height = size.height;
            }
        }
    }

    public updateTitle(popupPanelId:string, title:string):void {
        let popupPanelRef : PopupPanelRef = this.getByPopupPanelID(popupPanelId);
        if(popupPanelRef){
            popupPanelRef.panelComponentRef.instance.title = title;
            popupPanelRef.panelComponentRef.instance.popup.instance.repaint();
        }
    }

    print(){
        console.log('popup containers');
        console.log('value.Id','value.OwnerComponentName','value.ParentComponentName','value.PanelViewType');
        this._map.forEach((value,key) =>{
            console.log('key');
            console.log(value.Id,value.ownerComponentName,value.parentComponentName,value.panelViewType);
            console.log('-------------------');
        });
    }    
}