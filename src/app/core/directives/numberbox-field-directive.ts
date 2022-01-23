import { Input,OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { isString } from "lodash";
import { INumberBoxComponent } from "src/app/devextreme/interfaces/number-box/inumber-box-component";
import { INumberBoxEditorOptions } from "src/app/devextreme/interfaces/number-box/inumber-box-editor-options";
import { INumberBoxInitilizeArgs } from "src/app/devextreme/interfaces/number-box/inumber-box-initialize-args";
import { INumberBoxValueChangedArgs } from "src/app/devextreme/interfaces/number-box/inumber-box-value-changed-args";
import { Notify } from "../decorators/notify";
import { Override } from "../decorators/override";
import { Virtual } from "../decorators/virtual";
import { FieldDirective } from "./field.directive";
import { InputBasedFieldDirective } from "./input-based-field-directive";


export abstract class NumberBoxFieldDirective extends InputBasedFieldDirective<number> implements OnInit,OnDestroy{
    
    private _editorOptions:INumberBoxEditorOptions;
    private _editorInstance:INumberBoxComponent;

    @Input('format')
    @Notify()
    public format:string;
    
    
    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

    public get editorOptions():INumberBoxEditorOptions{
        return this._editorOptions;
    }

    @Override()
    protected setInitialValues(): void {
        super.setInitialValues();
    }

    @Override()
    protected initializeOptions(): void {
        super.initializeOptions();
        this.editorOptions.disabled = this.disabled;
        this.editorOptions.visible = this.visible;

        this.editorOptions.readonly = this.readonly;
        this.editorOptions.placeholder = this.placeholder;

        this.editorOptions.format = this.format;
        this.editorOptions.editorType = "dxNumberBox";
        this.editorOptions.editorOptions = this.editorOptions;

    }

    @Override()
    protected setEditorOptions(): void {
        super.setEditorOptions();
        this._editorOptions={
            format:this.format,
            onInitilized:(args:INumberBoxInitilizeArgs) => this.editorInitialized(args),
            onValueChanged:(args:INumberBoxValueChangedArgs) => this.valueChanged(args)
        };
    }

    @Virtual()
    protected editorInitialized(args:INumberBoxInitilizeArgs){
        this.editorInstance = args.component;
        this.configureDataType(this.editorInstance);
    }
   
    @Override()
    protected valueChanged(args:INumberBoxValueChangedArgs){
        super.valueChanged(args);
    }

    @Override()
    protected updateChanges(changes:SimpleChanges){
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
        }
    }

    private configureDataType(instance:INumberBoxComponent):void{
        let value:number = instance.option("value");
        if(isString(value)){
            value = Number.parseFloat(value.toString());
            instance.option("value",value);
        }
    }

    ngOnInit(): void {
       super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();

    }

    
    
}