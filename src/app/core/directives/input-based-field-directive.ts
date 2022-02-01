import { Input,OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested/item-dxi";
import { Notify } from "../decorators/notify";
import { FieldDirective } from "./field.directive";


export abstract class InputBasedFieldDirective<TV> extends FieldDirective<TV> implements OnInit,OnDestroy{

    @Input('placeHolder')
    @Notify()
    public placeHolder:string;

    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

    ngOnInit(): void {
       super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();

    }

}
