import { Pipe, PipeTransform } from "@angular/core";
import { LocalizationService } from "../localization.service";


@Pipe({
    name:'translate'
})
export class TranslatePipe implements PipeTransform{

    constructor(private localization: LocalizationService){

    }

    transform(value: string | string[], args?: string | object | string[]) {
        return this.localization.getMessage(value,args);   
    }

}