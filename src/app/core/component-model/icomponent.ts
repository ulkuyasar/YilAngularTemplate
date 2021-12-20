import { ViewContainerRef } from "@angular/core";

export interface IComponent{
        constructor:Function;
        viewContainerRef:ViewContainerRef;
        componentID:string;

        hasOwnProperty(propertyName:string):boolean;
        getClassName():string;

}