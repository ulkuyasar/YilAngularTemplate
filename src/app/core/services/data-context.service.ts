import { Injectable, Injector } from "@angular/core";
import { IComponent } from "../component-model/icomponent";
import { DataContext } from "../data/data-context";
import { BaseService } from "./base-sevice";

@Injectable({providedIn:'root'})
export class DataContextService extends BaseService{

    private _map: Map<string,DataContext>;

    constructor(injector : Injector){
        super(injector);
        this._map = new  Map<string,DataContext>();
    }

    register(component: IComponent){
        let dataContext = new DataContext();
        this._map.set(component.componentID,dataContext);
    }

    unregister(component: IComponent){
        if (this._map.has(component.componentID)){
            this._map.delete(component.componentID);
        }
    }
    
    get(component: IComponent): DataContext{    
        return this._map.get(component.componentID) as DataContext;
    }
}