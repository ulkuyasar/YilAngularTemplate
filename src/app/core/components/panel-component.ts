import { AfterViewInit, ComponentFactory, ComponentRef, ContentChildren, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { EventEmitter } from "stream";
import { Virtual } from "../decorators/virtual";
import { BaseComponent } from "./base-component";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class PanelComponent extends BaseComponent implements OnInit, OnDestroy,AfterViewInit{


    @Input()
    panelViewType:PanelViewType;

    containerDivID:string;

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
