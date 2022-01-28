import { Type } from "@angular/core";
import { IComponent } from "./icomponent";

export class ComponentDictionary{

    private static _mapByType: Map<Type<any>,string> = new  Map<Type<any>,string>();
    private static _mapByName: Map<string, Type<any>> = new  Map<string,Type<any>>();

    public static registerComponent(component:any, type: Type<any>, name:string){
        ComponentDictionary._mapByType.set(type,name);
        ComponentDictionary._mapByName.set(name,type);
        component.prototype.__componentClassName = () => {return name;}

    }

    public static getComponentName(component:IComponent):string{
        return component.getClassName();
    }

    public static getComponentNameByType(type: Type<any>){
        if (ComponentDictionary._mapByType.has(type)){
            return ComponentDictionary._mapByType.get(type);
        }
        return type.name;
    }

    public static getComponentTypeByName(name:string): Type<any>{
        if (ComponentDictionary._mapByName.has(name)){
            return ComponentDictionary._mapByName.get(name) as Type<any>;
        }
        return null;
    }

    public static printComponents(){
        ComponentDictionary._mapByType.forEach((value:string,key:Type<any>) => {
            console.log(value,key);

        })
    }


}
