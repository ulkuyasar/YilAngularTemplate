import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Pipe({
    name:'safe'
})
export class SafePipe implements PipeTransform{

    constructor(private _sanitizer:DomSanitizer){
    }

    transform(url:string): SafeUrl{
       return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
