import { TypeDecorator } from "@angular/core";

export function GlobalModel():TypeDecorator{
    return function(target:any,propertyKey?:string ,parameterIndex?:number){
        target.prototype.__isGlobalModel = () => { return true; }
    }
}