import { AfterViewInit, Component, Input, OnDestroy, OnInit,  ViewContainerRef } from "@angular/core";
import { PanelViewType } from "../component-model/panel-view-type.enum";
import { BaseComponent } from "./base-component";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class PanelComponent extends BaseComponent implements OnInit, OnDestroy,AfterViewInit{


    @Input()
    panelViewType!:PanelViewType;

    containerDivID!:string;

    constructor(viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

}
