import {  EventEmitter,  Input, OnDestroy, OnInit, Output,  ViewContainerRef } from "@angular/core";
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
import { DxiItemComponent } from "devextreme-angular/ui/nested/item-dxi";

export abstract class LookupFieldDirective<TM extends Model | EnumModel, TKey =number> extends InputBasedFieldDirective<TKey> implements OnInit,OnDestroy {


    @Input('parentFields')
    public parentFields:Array<IParentField>;

    @Input('modelField')
    public modelField:string;

    @Input('modelFieldSourcePath')
    public modelFieldSourcePath:string;

    @Input('defaultDataSourceOptions')
    @Notify()
    public defaultDataSourceOptions:DataSourceOptions;

    @Output('onSelectedItemChanged')
    public selectedItemChangedEvent = new EventEmitter<ISelectedItemChangedArgs<TM>>();

    public isResetDisabled:boolean;
    private _isResetHolded:boolean;
    private dataLoadedEvent = new EventEmitter<void>();
    private _keyMap:Map<string,any>;
    private _selectedItem:TM;

    private _parentFieldValueChangedSubscription:Subscription;
    private _parentFieldDataLoadedSSubscription:Subscription;

    constructor(hostItem: DxiItemComponent,private viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
        this._keyMap = new Map<string,any>();
    }

    protected get keyMap(): Map<string,any>{
        return this._keyMap;
    }

    protected get hasParentField():boolean{
        return this.parentFields !=null && this.parentFields != undefined && this.parentFields.length>0;
    }


    public get selectedItem():TM{
        return this._selectedItem;
    }

    @Override()
    protected setInitialValues():void{
       super.setInitialValues();
       this.isResetDisabled = false;
       this._isResetHolded = false;

    }


    @Virtual()
    protected loadData(options?:DataSourceOptions,reset:boolean=false):void{
        this.onDataLoaded();
    }

    @Virtual()
    protected isLoadOnInitEnabled():boolean{
        return true;
    }


    @Virtual()
    protected selectedItemChanged(args: ISelectedItemChangedArgs<TM>):void{
        this._selectedItem = args.selectedItem;
        this.updateModelField();
        this.onSelectedItemChanged(args);
    }

    private subscribeToParentFields():void{
        if(this.parentFields && this.parentFields.length>0){
            this.parentFields.forEach(parentField => {
                if (parentField.key && parentField.field){
                    this.setKeyMapValue(parentField.key,0);
                    this._parentFieldValueChangedSubscription = parentField.field.valueChangedEvent.subscribe(
                        (args:IFieldValueChangedArgs)=>{
                           this.setKeyMapValue(parentField.key,args.value);
                           let reset:boolean = this.isResetDisabled ===false && this._isResetHolded ===false;
                           this._isResetHolded = false;
                           this.loadData(this.defaultDataSourceOptions,reset);
                        });

                        this._parentFieldDataLoadedSSubscription = parentField.field.dataLoadedEvent.subscribe(
                            ()=>{
                                this.setKeyMapValue(parentField.key,this.getModelValueOfField(parentField.field));
                                this.loadData(this.defaultDataSourceOptions,false);
                            });

                }
            });
        }
    }

    private unsubcribeFromParentFields():void{
        if(this._parentFieldValueChangedSubscription){
            this._parentFieldValueChangedSubscription.unsubscribe();
            this._parentFieldValueChangedSubscription=null;
        }

        if(this._parentFieldDataLoadedSSubscription){
            this._parentFieldDataLoadedSSubscription.unsubscribe();
            this._parentFieldDataLoadedSSubscription=null;
        }

    }

    private setKeyMapValue(key:string,value:any):void{
        let valueToBeSet = 0;
        if(value){
            valueToBeSet = value;

        }
        this.keyMap.set(key,valueToBeSet);
    }

    protected addQueryParams(options:DataSourceOptions):DataSourceOptions{
        if(!options){
            options = new DataSourceOptions();
        }

        if(!options.queryParams){
            options.queryParams = new Array<QueryStringParam>();
        }

        this.keyMap.forEach((value,key) => {
            options.queryParams.push({key:key,value:value});

        });
        return options;
    }

    protected updateModelField():void{
        if(this.modelField && this.isModelLoading === false){
            let value = this.getModelValue(this.selectedItem,this.modelFieldSourcePath);
            this.setModelValue(this.model,this.modelField,value);
        }
    }

    public holdReset():void{
        this._isResetHolded=true;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.subscribeToParentFields();
    }

    ngOnDestroy(): void {
       super.ngOnDestroy();
       this.unsubcribeFromParentFields();
    }

    protected onSelectedItemChanged(args:ISelectedItemChangedArgs<TM>):boolean{
        let handled:boolean=false;
        if(this.selectedItemChangedEvent.observers.length>0){
            handled=true;
            this.selectedItemChangedEvent.emit(args);
        }
        return handled;
    }

    protected onDataLoaded():boolean{
        let handled:boolean=false;
        if(this.dataLoadedEvent.observers.length>0){
            handled=true;
            this.dataLoadedEvent.emit();
        }
        return handled;
    }

}
