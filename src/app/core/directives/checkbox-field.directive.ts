import { EventEmitter, Input, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { ICheckBoxComponent } from "src/app/devextreme/interfaces/check-box/icheckbox-component";
import { ICheckBoxInitilizeArgs } from "src/app/devextreme/interfaces/check-box/icheckbox-initialize-args";
import { ICheckBoxOptions } from "src/app/devextreme/interfaces/check-box/icheckbox-options";
import { ICheckBoxValueChangedArgs } from "src/app/devextreme/interfaces/check-box/icheckBox-value-changed-args";
import { Override } from "../decorators/override";
import { FieldDirective } from "./field.directive";


export abstract class CheckboxFieldDirective extends FieldDirective<boolean> implements OnInit,OnDestroy{
    
    private _editorOptions:ICheckBoxOptions;
    private _editorInstance:ICheckBoxComponent;

    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

    public get editorOptions():ICheckBoxOptions{
        return this._editorOptions;
    }

    public get editorInstance():ICheckBoxComponent{
        return this._editorInstance;
    }

    @Override()
    protected setInitialValues(): void{
        super.setInitialValues();
    }

    @Override()
    protected initializeOptions(): void{
        super.initializedOptions();
        this.editorOptions.visible = this.visible;
        this.editorOptions.disabled = this.disabled;
        this.editorOptions.readonly = this.readonly;
        this.editorOptions.value = this.value;
        this.editorOptions.icon = this.buttonIcon;

        this.hostItem.itemType = "dxCheckBox";
        this.hostItem.buttonOptions = this.editorOptions;
    }

    @Override()
    protected setEditorOptions():void{
        super.setEditorOptions();
        this._editorOptions = {
            onInitilized:(args:ICheckBoxInitilizeArgs) => this.editorInitialized(args),
            onValueChanged:(args:ICheckBoxValueChangedArgs) => this.valueChanged(args),
        };
    }

    private editorInitialized(args:ICheckBoxInitilizeArgs):void{
        this._editorInstance=args.component;
    }

    @Override()
    protected valueChanged(args:ICheckBoxValueChangedArgs):void{
        this.valueChanged(args);
    }

    @Override()
    protected updateChanged(changes:SimpleChanges):void{
        super.updateChanged(changes);
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
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}