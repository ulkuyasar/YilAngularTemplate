import { Type, TypeDecorator } from "@angular/core";
import { ComponentDictionary } from "../component-model/component-dictionary";

export function ComponentName(type:Type<any>,name:string){

    return function(target:any,propertyKey?:string,parameterIndex?:number){
        ComponentDictionary.registerComponent(target,type,name);
    }
}