import { TypeDecorator } from "@angular/core";

export function OrganizationalModel():TypeDecorator{
    return function(target:any,propertyKey?:string , parameterIndex?:number){
        target.prototype.__isOrganizationalModel = () => { return true; }
    }
}