import {  EventEmitter,  Input, OnDestroy, OnInit, Output,  SimpleChanges,  ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { Notify } from "../decorators/notify";
import { Subscription } from "rxjs";
import { Model } from "../models/model";
import { EnumModel } from "src/app/models/core/enum-model";
import { Virtual } from "../decorators/virtual";
import { InputBasedFieldDirective } from "./input-based-field-directive";
import { IParentField } from "./iparent-field";
import { DataSourceOptions } from "../data/data-source-options";
import { ISelectedItemChangedArgs } from "./iselected-item-changed-args";
import { Override } from "../decorators/override";
import { IFieldValueChangedArgs } from "./ifield-value-changed-args";
import { QueryStringParam } from "../data/query-string-param";
import { LookupFieldDirective } from "./lookup-field-directive";
import { ISelectBoxEditorOptions } from "src/app/devextreme/interfaces/select-box/iselect-box-editor-options";
import { ISelectBoxComponent } from "src/app/devextreme/interfaces/select-box/iselect-box-component";
import { ISelectBoxValueChangedArgs } from "src/app/devextreme/interfaces/select-box/iselect-box-value-changed-args";
import { ISelectBoxSelectionChangedArgs } from "src/app/devextreme/interfaces/select-box/iselect-box-selection-changed-args";
import { ISelectBoxInitilizedArgs } from "src/app/devextreme/interfaces/select-box/iselect-box-initialized-args";


export abstract class SelectBoxFieldDirective<TM extends Model | EnumModel, TKey =number> extends LookupFieldDirective<TKey> implements OnInit,OnDestroy {

    
    @Input('showClearButton')
    @Notify()
    public showClearButton:boolean;
    
    @Input('searchEnabled')
    @Notify()
    public searchEnabled:boolean;

    @Input('valueExpr')
    @Notify()
    public valueExpr:string;

    @Input('displayExpr')
    @Notify()
    public displayExpr:string;

    private _editorOptions:ISelectBoxEditorOptions<TM>;
    private _editorInstance:ISelectBoxComponent;


    
    constructor(hostItem: DxiItemComponent,private viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
    }

   
    public get editorOptions():ISelectBoxEditorOptions<TM>{
        return this._editorOptions;
    }

    public get editorInstance():ISelectBoxComponent{
        return this._editorInstance;
    }


   
    @Override()
    protected setInitialValues():void{
       super.setInitialValues();
       this.showClearButton = true;
       this.searchEnabled = true;

    }

    @Override()
    protected initializeOptions(): void{
        super.initializeOptions();
        this.editorOptions.visible = this.visible;
        this.editorOptions.disabled = this.disabled;
        this.editorOptions.readOnly = this.readOnly;
        this.editorOptions.placeholder = this.placeHolder;
        this.editorOptions.showClearButton = this.showClearButton;
        this.editorOptions.searchEnabled = this.searchEnabled;
        this.editorOptions.valueExpr = this.valueExpr;
        this.editorOptions.displayExpr = this.displayExpr;
        
        this.hostItem.editorType = "dxSelectBox";
        this.hostItem.editorOptions = this.editorOptions;
    }

    @Override()
    protected setEditorOptions():void{
        super.setEditorOptions();
        this._editorOptions = {
            valueExpr:this.valueExpr,
            displayExpr:this.displayExpr,
            onInitilized:(args:ISelectBoxInitilizedArgs) => this.editorInitialized(args),
            onValueChanged:(args:ISelectBoxValueChangedArgs) => this.valueChanged(args),
            onSelectionChanged:(args:ISelectBoxSelectionChangedArgs<TM>) => this.selectedItemChanged(args)
        };
    }

    private editorInitialized(args:ISelectBoxInitilizedArgs):void{
        this._editorInstance=args.component;
        setTimeout(()=>{
            if(this.isLoadOnInitEnabled()){
                this.loadData(this.defaultDataSourceOptions);
            }
        },1);
    }

    @Override()
    protected selectedItemChanged(args:ISelectBoxSelectionChangedArgs<TM>):void{
        super.selectedItemChanged(args);
    }

    @Override()
    protected valueChanged(args:ISelectBoxValueChangedArgs):void{
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

            if (changes['showClearButton']){
                this.editorInstance.option("showClearButton", this.showClearButton);
            }

            if (changes['searchEnabled']){
                this.editorInstance.option("searchEnabled", this.searchEnabled);
            }

            if (changes['valueExpr']){
                this.editorInstance.option("valueExpr", this.valueExpr);
            }

            if (changes['displayExpr']){
                this.editorInstance.option("displayExpr", this.displayExpr);
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