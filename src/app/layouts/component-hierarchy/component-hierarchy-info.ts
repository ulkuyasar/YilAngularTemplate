import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { IComponent } from "src/app/core/component-model/icomponent";
import { ComponentHierarchyService } from "./component-hierarchy-service";

export class ComponentHierarchyInfo{

    ComponentID:string = "";
    ComponentName:string="";
    ComponentInstance?:IComponent;
    RouteComponentName:string = "";
    ParentRouteComponentName:string="";

    private _componentHierarchyService:ComponentHierarchyService;

    constructor(componentHierarchyService:ComponentHierarchyService){
        this._componentHierarchyService = componentHierarchyService;
    }

    getParentInfo(){
        return this._componentHierarchyService.getParentRouteInfo(this);
    }

    print(){
        console.log('ComponentID: ' , this.ComponentID);
        console.log('ComponentName: ' , this.ComponentName);
        console.log('RouteComponentName: ' , this.RouteComponentName);
        console.log('ParentRouteComponentName: ' , this.ParentRouteComponentName);
        console.log( this.ComponentInstance);


    }



}