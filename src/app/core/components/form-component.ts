import {  Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewContainerRef } from "@angular/core";
import { DxFormComponent } from "devextreme-angular";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { Virtual } from "../decorators/virtual";
import { IFormOption } from "../directives/iform-option";
import { BaseComponent } from "./base-component";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class FormComponent extends BaseComponent implements OnInit, OnDestroy{

    
    @ViewChild(DxFormComponent,{static:true})
    form:DxFormComponent;

    @ContentChildren(DxiItemComponent)
    itemsChildren: QueryList<DxiItemComponent>;

    @Input('readOnly')
    readOnly:boolean=false; 
    
    @Output('onOptionChanged')
    optionChangedEvent = new EventEmitter<IFormOption>();

    constructor(public viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
    }


    public clear(resetValues:boolean=true):void{
        if( this.form.validationGroup){
            this.form.instance.validate().isValid = true;
        }
        if (resetValues===true){
            this.form.instance.resetValues();
        }
    }

    @Virtual()
    public model():object{
        return null as any;  // yasar   return null
    }

    public reloadForm():void{
        if(this.form){
            this.form.formData = this.model();
        }
    }

    public optionChanged(option:IFormOption):void{
        if(this.onOptionChanged(option)){
            return;
        }
    }




    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected onOptionChanged(option:IFormOption):boolean{
        let handled : boolean = false;
        if (this.optionChangedEvent.observers.length >0){
            handled = true;
            this.optionChangedEvent.emit(option);
        }
        return handled;
    }

}
