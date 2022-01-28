import { Input,OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested/item-dxi";
import { ITextAreaComponent } from "src/app/devextreme/interfaces/text-area/itext-area-component";
import { ITextAreaEditorOptions } from "src/app/devextreme/interfaces/text-area/itext-area-editor-options";
import { ITextAreaInitilizedArgs } from "src/app/devextreme/interfaces/text-area/itext-area-initialized-args";
import { ITextAreaValueChangedArgs } from "src/app/devextreme/interfaces/text-area/itext-area-value-changed-args";
import { Notify } from "../decorators/notify";
import { Override } from "../decorators/override";
import { TextBasedFieldDirective } from "./text-based-field-directive";


export abstract class TextAreaFieldDirective extends TextBasedFieldDirective  implements OnInit,OnDestroy{

    @Input('height')
    @Notify()
    public height:string;

    private _editorOptions:ITextAreaEditorOptions;
    private _editorInstance:ITextAreaComponent;

    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

    public get editorOptions():ITextAreaEditorOptions{
        return this._editorOptions;
    }

    public get editorInstance():ITextAreaComponent{
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
        this.editorOptions.height = this.height;

        this.hostItem.itemType = "dxTextArea";
        this.hostItem.editorOptions = this.editorOptions;
    }

    @Override()
    protected setEditorOptions():void{
        super.setEditorOptions();
        this._editorOptions = {
            onInitilized:(args:ITextAreaInitilizedArgs) => this.editorInitialized(args),
            onValueChanged:(args:ITextAreaValueChangedArgs) => this.valueChanged(args),
        };
    }

    private editorInitialized(args:ITextAreaInitilizedArgs):void{
        this._editorInstance=args.component;
    }

    @Override()
    protected valueChanged(args:ITextAreaValueChangedArgs):void{
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

            if (changes['height']){
                this.editorInstance.option("mask", this.height);
            }

        }
    }


    ngOnInit(): void {
       super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
