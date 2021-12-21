import { PipeTransform } from "@angular/core";

export class TranslatePipe implements PipeTransform{

    constructor(private localization: LocaliizationService){

    }

    transform(value: string | string[], args?: string | object | string[]) {
        return this.localization.getMessage(value,args);   
    }

}