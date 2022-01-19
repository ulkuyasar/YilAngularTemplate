import { Injectable,Type, Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentDictionary } from "src/app/core/component-model/component-dictionary";
import { IComponent } from "src/app/core/component-model/icomponent";
import { BaseService } from "src/app/core/services/base-sevice";
import { ComponentHierarchyInfo } from "./component-hierarchy-info";

@Injectable({ providedIn:'root'})
export class ComponentHierarchyService extends BaseService{

    private _mapRouteComponents: Map<string,string>;
    public _mapHierarchy:Map<string,ComponentHierarchyInfo>;
    private rootComponentHierarchyInfo:ComponentHierarchyInfo;

    constructor(injector:Injector){
        super(injector);
        this._mapRouteComponents = new Map<string,string>();
        this._mapHierarchy = new Map<string,ComponentHierarchyInfo>();
        this.rootComponentHierarchyInfo = new ComponentHierarchyInfo(this);  //yasar

    }

    addComponent(activatedRoute: ActivatedRoute , component:IComponent):ComponentHierarchyInfo{
        let componentID:string = component.componentID;
        let componentName:string = component.getClassName();

        let hierarchyInfo :  ComponentHierarchyInfo = new ComponentHierarchyInfo(this);
        hierarchyInfo.ComponentID = componentID;
        hierarchyInfo.ComponentName = componentName;
        hierarchyInfo.ComponentInstance = component;

        let routeComponentName:string = this.getComponentName(activatedRoute.component as string|Type<any>);
        if (routeComponentName){
            hierarchyInfo.RouteComponentName = routeComponentName;
            if (routeComponentName === componentName){
                this._mapRouteComponents.set(routeComponentName,componentID);
            }
        }

        let parentRouteComponentName :string = this.getParentRouteComponentName(activatedRoute);
        if (parentRouteComponentName){
            hierarchyInfo.ParentRouteComponentName = parentRouteComponentName;
        }

        this._mapHierarchy.set(componentID,hierarchyInfo);
        if(componentName === 'RootComponent'){
            this.rootComponentHierarchyInfo = hierarchyInfo;
        }
        return hierarchyInfo;
    }

    removeComponent(component:IComponent){
        if (this._mapHierarchy.has(component.componentID)){
            this._mapHierarchy.delete(component.componentID);
        }
        if (this._mapRouteComponents.has(component.getClassName())){
            this._mapRouteComponents.delete(component.getClassName());
        }
    }

    get RootComponentHierarchyInfo(){
        return this.rootComponentHierarchyInfo;
    }

    getRouteInfo(hierarchyInfo:ComponentHierarchyInfo) : ComponentHierarchyInfo{
        return this.getRouteInfoByName(hierarchyInfo.RouteComponentName);
    }

    getRouteInfoByActivatedRoute(activatedRoute: ActivatedRoute):ComponentHierarchyInfo{
        let componentName:string = this.getRouteComponentName(activatedRoute);
        return this.getRouteInfoByName(componentName);
    }

    getRouteInfoByName(componentName:string) : ComponentHierarchyInfo{
        if (this._mapRouteComponents.has(componentName)){
            let componentid :string = this._mapRouteComponents.get(componentName) as string;
            return this._mapHierarchy.get(componentid) as ComponentHierarchyInfo;
        }
        return null as any;
    }

    getParentRouteInfo(hierarchyInfo:ComponentHierarchyInfo):ComponentHierarchyInfo{
        return this.getRouteInfoByName(hierarchyInfo.ParentRouteComponentName);
    }

    getRouteComponentName(activatedRoute: ActivatedRoute):string{
        if (activatedRoute.component){
            return this.getComponentName(activatedRoute.component);
        }else if (activatedRoute.parent){
            return this.getRouteComponentName(activatedRoute.parent);
        }
        return null as any;
    }

    calculateUrl(activatedRoute:ActivatedRoute):string{
        let url:string = "";

        let activatedRoutes:ActivatedRoute[]= activatedRoute.pathFromRoot.slice(2);
        for(let index=0; index < activatedRoutes.length; index++){
            let activatedRoute : ActivatedRoute = activatedRoutes[index];
            let urlSegments : Array<any> = activatedRoute.snapshot.url;

            urlSegments.forEach(element => {
                url += '/' + element.path;              
            });
        }
        return url;
    }

    private getParentRouteComponentName(activatedRoute:ActivatedRoute):string{
            if (activatedRoute.parent){
                return this.getRouteComponentName(activatedRoute.parent);
            }
            return null as any;
    }

    private getComponentName(component:string | Type<any>) : string{
        if (component instanceof String){
            return <string>component;
        }

        if (component instanceof Type){
            return ComponentDictionary.getComponentNameByType(component) as string;
        }

        return null as any;
    }

    print(){
        console.log("hierarchy");
        console.log("value.ComponentID", "value.ComponentName","value.RouteComponentName","value.ParentRouteComponentName");
        this._mapHierarchy.forEach((value,key) => {
            console.log(key);
            console.log(value.ComponentID, value.ComponentName,value.RouteComponentName,value.ParentRouteComponentName);
            console.log("----------");
            
        });

    }

    
}