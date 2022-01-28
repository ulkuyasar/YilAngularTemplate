import { Input,OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested/item-dxi";
import { Notify } from "../decorators/notify";
import { FieldDirective } from "./field.directive";
import { InputBasedFieldDirective } from "./input-based-field-directive";


export abstract class TextBasedFieldDirective extends InputBasedFieldDirective<string>  implements OnInit,OnDestroy{

    @Input('maxLenght')
    @Notify()
    public maxLenght:number;



    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

    protected isEmpty():boolean{
        return this.value==undefined || this.value==null || this.value==="";
    }


    ngOnInit(): void {
       super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();

    }



}
