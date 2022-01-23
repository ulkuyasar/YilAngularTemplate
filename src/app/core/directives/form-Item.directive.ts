import { AfterContentInit, AfterViewInit, ChangeDetectorRef, EventEmitter, Injector, Input,Type, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { Notify } from "../decorators/notify";
import $ from 'jquery';
import { Subscription } from "rxjs";
import { GlobalUtilities } from "src/app/utilities/global-utilities";
import { FormComponent } from "../components/form-component";
import { ModelFormComponent } from "src/app/layouts/model-form/model-form.component";
import { FilterPanelComponent } from "src/app/layouts/filter-panel/filter-panel.component";
import { FilterModel } from "../models/filter-model";
import { Model } from "../models/model";
import { EnumModel } from "src/app/models/core/enum-model";
import { Virtual } from "../decorators/virtual";
import { IFormOption } from "./iform-option";
import { FieldDirective } from "./field.directive";


export abstract class FormItemDirective implements OnInit,OnDestroy,OnChanges,AfterViewInit,AfterContentInit{
    
    @Input('disabled')
    @Notify()
    public disabled:boolean;
    
    @Input('visible')
    @Notify()
    public visible:boolean;

    private _id:string;
    private _hostItem:DxiItemComponent;
    private _htmlElement:JQuery<HTMLElement>;
    private _changeDetector:ChangeDetectorRef;

    private _isDestroyed:boolean = false;
    private _isModelLoading:boolean = false;

    private _modelLoadingSubscription:Subscription;
    private _modelLoadedSubscription:Subscription;
    private _optionChangedSubscription:Subscription;
    private _contentReadySubscription:Subscription;

    
    constructor(hostItem: DxiItemComponent,private viewContaiberRef: ViewContainerRef){
        this.hostItem = hostItem;
        
        Object.defineProperties(hostItem,"disabled",{ writable:true });
        Object.defineProperties(hostItem,"visible",{ writable:true });

        this._id = GlobalUtilities.NewGuid();
        this._changeDetector = this.injector.get(ChangeDetectorRef);
        this.setInitialValues();
    }

    public get id():string{
        return this._id;
    }

    public get selectorClass():string{
        return "YASARYILMAZ.AS.field"+this.id;
    }


    public get hostItem():DxiItemComponent{
        return this._hostItem;
    }

    public get htmlElement():JQuery<HTMLElement>{
        return this._htmlElement;
    }

    public get injector():Injector{
        return this.viewContaiberRef.injector;
    }

    public get form():FormComponent{
        let modelForm:ModelFormComponent = this.injectOptional<ModelFormComponent>(ModelFormComponent);
        if (modelForm){
            return modelForm;
        }

        let filterPanel:FilterPanelComponent = this.injectOptional<FilterPanelComponent>(FilterPanelComponent);
        return filterPanel;
       
    }

    public get model():Model | FilterModel | EnumModel{
        return this.form.model();
    }

    public get isModelLoading():boolean{
        return this._isModelLoading;
    }

    public get isDestroyed():boolean{
        return this._isDestroyed;
    }
   
    public detectChanges():void{
        if(this.isDestroyed === false){
            this._changeDetector.detectChanges();
        }
    }

    @Virtual()
    protected setInitialValues():void{
        this.disabled = false;
        this.visible = true;
        this.hostItem.cssClass = this.selectorClass;
    }

    @Virtual()
    protected initializeOptions():void{
    }

    @Virtual()
    protected updateChanges(changes:SimpleChanges):void{
    }

    @Virtual()
    protected updateFormOption(option:IFormOption):SimpleChanges{
        let changes: SimpleChanges = {};
        return changes;
    }

    @Virtual()
    protected formContentReady():void{
        this._htmlElement = $("."+this.selectorClass);
    }

    @Virtual()
    protected getModelValue(model: Model|FilterModel|EnumModel, propertyPath:string):any{
        let pathList : string[] = propertyPath.split(".");
        let value = model;

        pathList.forEach(path => {
            if(!value){
                return value;
            }
            value = value[path];
            
        });
        return value;
    }

    protected setModelValue(model: Model|FilterModel|EnumModel, propertyPath:string,value:any):void{
        let isOK : boolean = true;
        let lastPath:string = propertyPath;
        let pathList:string[] = propertyPath.split(".");
        let valueOwner = model;
        
        pathList.forEach((path,index) => {
            lastPath = path;
            if(isOK && index < pathList.length-1){
                if(!valueOwner){
                    isOK = false;
                }else{
                    valueOwner = valueOwner[path];
                }
            }           
        });
        if (valueOwner){
            valueOwner[lastPath] = value;
        }
    }

    protected getModelValueOfField(field:FieldDirective<any>):any{
        return this.getModelValue(field.model, field.hostItem.dataField);
    }

    protected injectOptional<S>(serviceType: Type<S>):S{
        let service:S;
        try{
            service = this.injector.get<S>(serviceType);
        }catch(error){
            service = null;
        }
        return service;
    }

    private subscribeToForm():void{
        if(this.form){
            if(this.form instanceof ModelFormComponent){
                this.subscribeToModelLoading(this.form);
                this.subscribeToModelLoaded(this.form);
            }
            this.subscribeToOptionChanged(this.form);
            this.subscribeToContentReady(this.form);
        }
    }

    private unsubscribeFromForm():void{
            this.unsubscribeToModelLoading();
            this.unsubscribeToModelLoaded();
            this.unsubscribeToOptionChanged();
            this.unsubscribeToContentReady();

    }

    private subscribeToModelLoading(modelForm:ModelFormComponent):void{
        if(modelForm){
            if(!this._modelLoadingSubscription){
                this._modelLoadingSubscription = modelForm.modelLoadingEvent.subscribe(
                    (model)=> {
                        this._isModelLoading = true;
                    });
            }
        }
    }

    private subscribeToModelLoaded(modelForm:ModelFormComponent):void{
        if(modelForm){
            if(!this._modelLoadedSubscription){
                this._modelLoadedSubscription = modelForm.modelLoadedEvent.subscribe(
                    (model)=> {
                        this._isModelLoading = false;
                    });
            }
        }
    }


    private subscribeToOptionChanged(form:FormComponent):void{
        if(form){
            if(!this._optionChangedSubscription){
                this._optionChangedSubscription = form.optionChangedEvent.subscribe(
                    (option:IFormOption)=> {
                        if(option){
                            let changes:SimpleChanges = this.updateFormOption(option);
                            if(changes){
                                this.ngOnChanges(changes);
                            }
                        }
                    });
            }
        }
    }

    private subscribeToContentReady(form:FormComponent):void{
        if(form && form.form){
            if(!this._contentReadySubscription){
                this._contentReadySubscription = form.form.onContentReady.subscribe(
                    (formInstance:object)=> {
                        this.formContentReady();
                    });
            }
        }
    }

    private unsubscribeToModelLoading():void{
        if(this._modelLoadingSubscription){
            this._modelLoadingSubscription.unsubscribe();
            this._modelLoadingSubscription = null;
        }
    }

    private unsubscribeToModelLoaded():void{
        if(this._modelLoadedSubscription){
            this._modelLoadedSubscription.unsubscribe();
            this._modelLoadedSubscription = null;
        }
    }

    private unsubscribeToOptionChanged():void{
        if(this._optionChangedSubscription){
            this._optionChangedSubscription.unsubscribe();
            this._optionChangedSubscription = null;
        }
    }

    private unsubscribeToContentReady():void{
        if(this._contentReadySubscription){
            this._contentReadySubscription.unsubscribe();
            this._contentReadySubscription = null;
        }
    }

    ngOnInit(): void {
        this._isDestroyed = false;
        this.subscribeToForm();
        this.initializeOptions();
    }

    ngOnDestroy(): void {
        this.unsubscribeFromForm();
        this._isDestroyed = true;
    }

    ngOnChanges(changes:SimpleChanges): void {
        this.updateChanges(changes);
    }

    ngAfterViewInit(): void {
        
    }

    ngAfterContentInit(): void {
        
    }
    
}