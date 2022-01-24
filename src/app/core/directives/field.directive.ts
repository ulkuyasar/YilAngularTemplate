import { AfterContentInit,   EventEmitter,  Input,  OnDestroy, OnInit, Output, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { Notify } from "../decorators/notify";
import { Override } from "../decorators/override";
import { Virtual } from "../decorators/virtual";
import { IFormOption } from "./iform-option";
import { FormItemDirective } from "./form-Item.directive";
import { IFieldValueChangedArgs } from "./ifield-value-changed-args";
import { ValidationRule } from "src/app/devextreme/types";

export abstract class FieldDirective<TV> extends FormItemDirective implements OnInit,OnDestroy,AfterContentInit{
    
    @Input('caption')
    @Notify()
    public caption:string;
    
    @Input('readOnly')
    @Notify('readOnly')
    public _readOnly:boolean;

    @Input('isAlwaysEditable')
    @Notify('isAlwaysEditable')
    @Notify('readOnly')
    public _isAlwaysEditable:boolean;

    @Input('labelVisible')
    @Notify('labelVisible')
    public _labelVisible:boolean;

    @Output('onValueChanged')
    public valueChangedEvent = new EventEmitter<IFieldValueChangedArgs>();

    @Notify('readOnly')
    public _isFormReadOnly:boolean;

    @Input('value')
    @Notify('value')
    public _value:TV;

    private _labelElement:JQuery<HTMLElement>;

    
    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
        Object.defineProperties(hostItem,"caption",{ writable:true });

    }

    public get value():TV{
        return this._value;
    }

    public get readOnly():boolean{
        return this._isAlwaysEditable ===false && (this._readOnly ===true || this._isFormReadOnly);
    }

    public set readOnly(value:boolean){
        this._readOnly =value;
    }


    public get labelVisible():boolean{
        return this.visible ===true && this._labelVisible===true;
    }

    public set labelVisible(value:boolean){
        this._labelVisible =value;
    }

    
    public get labelElement():JQuery<HTMLElement>{
        return this._labelElement;
    }

    @Override()
    protected setInitialValues():void{
        super.setInitialValues();
        this._readOnly =false;
        this._isAlwaysEditable =false;
        this._isFormReadOnly =false;
        this._labelVisible =false;
    }

    @Override()
    protected initializeOptions():void{
        this.initializeOptions();
    }

    @Override()
    public updateFormOption(option:IFormOption):SimpleChanges
    {
        let changes: SimpleChanges = super.updateFormOption(option);
        if(option.name === "readOnly"){
            let previousValue = this.readOnly;
            this._isFormReadOnly = option.value;

            //let change:SimpleChange = new SimpleChange(previousValue,this.readOnly,false);
            //changes["readOnly"] = change;
        }
        return changes;
    }

    @Override()
    protected formContentReady():void{
        super.formContentReady();
        this._labelElement = this.htmlElement.find("label");
        if(this._labelElement){
            this.visible ? this._labelElement.show() : this._labelElement.hide() ;
            this.updateCaption();
        }
    }

    @Override()
    protected updateChanges(changes:SimpleChanges):void{
        super.updateChanges(changes);
       
        if(this.labelElement){

            if (changes['visible']){
                this.labelVisible ? this.labelElement.show() : this.labelElement.hide() ;
            }

            if (changes['labelVisible']){
                this.labelVisible ? this.labelElement.show() : this.labelElement.hide() ;
            }

            if (changes['caption']){
                this.updateCaption();
            }
        }
    }

    @Virtual()
    protected setEditorOptions():void{
    }

    @Virtual()
    protected valueChanged(args:IFieldValueChangedArgs):void{
        this._value = args.value;
        this.onValueChanged(args);
    }

    
    public setValue(value:TV):void{
        this._value = value;
    }

    private findCaptionElement():JQuery<HTMLElement>{
        let captionElement: JQuery<HTMLElement>;
        if(this.labelElement){
            captionElement = this.labelElement.find(".dx-field-item-label-text");
            if(captionElement){
                captionElement = this.labelElement;
            }
        }
        return captionElement;
    }

    private updateCaption(){
        let captionElement: JQuery<HTMLElement> = this.findCaptionElement();
        if(captionElement && this.caption){
            captionElement.text( this.caption);
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        if(this.form){
            this._isFormReadOnly = this.form.readOnly;
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }


    ngAfterContentInit(): void {
        super.ngAfterContentInit();
        if(!this.hostItem.validationRules){
            this.hostItem.validationRules = new Array<ValidationRule>();
        }
        this.addValidationRules(this.hostItem.validationRules);
    }

    @Virtual()
    protected addValidationRules(validationRules:Array<ValidationRule>):void{
    }


    protected onValueChanged(args:IFieldValueChangedArgs):boolean{
        let handled:boolean=false;
        if(this.valueChangedEvent.observers.length>0){
            handled=true;
            this.valueChangedEvent.emit(args);
        }
        return handled;
    }


}