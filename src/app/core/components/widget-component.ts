
import { OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { BaseComponent } from "./base-component";


export abstract class WidgetComponent extends BaseComponent implements OnInit, OnDestroy{

    constructor(viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
