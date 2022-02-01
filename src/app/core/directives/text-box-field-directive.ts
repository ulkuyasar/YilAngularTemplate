import { Input,OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested/item-dxi";
import { ITextBoxComponent } from "src/app/devextreme/interfaces/text-box/itext-box-component";
import { ITextBoxEditorOptions } from "src/app/devextreme/interfaces/text-box/itext-box-editor-options";
import { ITextBoxInitilizedArgs } from "src/app/devextreme/interfaces/text-box/itext-box-initialized-args";
import { ITextBoxValueChangedArgs } from "src/app/devextreme/interfaces/text-box/itext-box-value-changed-args";
import { Notify } from "../decorators/notify";
import { Override } from "../decorators/override";
import { TextBasedFieldDirective } from "./text-based-field-directive";


export abstract class TextBoxFieldDirective extends TextBasedFieldDirective  implements OnInit,OnDestroy{

    @Input('mask')
    @Notify()
    public mask:string;

    @Input('width')
    public width:string;

    @Input('maskInvalidMessage')
    @Notify()
    public maskInvalidMessage:string;

    private _editorOptions:ITextBoxEditorOptions;
    private _editorInstance:ITextBoxComponent;



    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

    public get editorOptions():ITextBoxEditorOptions{
        return this._editorOptions;
    }

    public get editorInstance():ITextBoxComponent{
        return this._editorInstance;
    }

    @Override()
    protected setInitialValues(): void{
        super.setInitialValues();
    }

    @Override()
    protected initializeOptions(): void{
        super.initializeOptions();
        this.editorOptions.visible = this.visible;
        this.editorOptions.disabled = this.disabled;
        this.editorOptions.readOnly = this.readOnly;
        this.editorOptions.placeholder = this.placeHolder;
        this.editorOptions.maxLenght = this.maxLenght;
        this.editorOptions.mask = this.mask;
        this.editorOptions.width = this.width;
        this.editorOptions.maskInvalidMessage = this.maskInvalidMessage;

        this.hostItem.itemType = "dxTextBox";
        this.hostItem.editorOptions = this.editorOptions;
    }

    @Override()
    protected setEditorOptions():void{
        super.setEditorOptions();
        this._editorOptions = {
            onInitilized:(args:ITextBoxInitilizedArgs) => this.editorInitialized(args),
            onValueChanged:(args:ITextBoxValueChangedArgs) => this.valueChanged(args),
        };
    }

    private editorInitialized(args:ITextBoxInitilizedArgs):void{
        this._editorInstance=args.component;
    }

    @Override()
    protected valueChanged(args:ITextBoxValueChangedArgs):void{
        this.clearMaskInvalidMessage();
        super.valueChanged(args);
    }

    @Override()
    protected updateChanges(changes:SimpleChanges):void{
        super.updateChanges(changes);
        if(this.editorInstance){
            if (changes['disabled']){
                this.editorInstance.option("disabled", this.disabled);
            }

            if (changes['visible']){
                this.editorInstance.option("visible", this.visible);
            }

            if (changes['readOnly']){
                this.editorInstance.option("readOnly", this.readOnly);
            }

            if (changes['value']){
                this.editorInstance.option("value", this.value);
            }

            if (changes['placeHolder']){
                this.editorInstance.option("placeHolder", this.placeHolder);
            }

            if (changes['maxLenght']){
                this.editorInstance.option("maxLenght", this.maxLenght);
            }

            if (changes['mask']){
                this.editorInstance.option("mask", this.mask);
            }

            if (changes['maskInvalidMessage']){
                this.editorInstance.option("maskInvalidMessage", this.maskInvalidMessage);
            }
        }
    }

    private clearMaskInvalidMessage():void{
        if(this.editorInstance && this.isEmpty()){
            this.editorInstance.option("isValid",true);
        }
    }

    ngOnInit(): void {
       super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
