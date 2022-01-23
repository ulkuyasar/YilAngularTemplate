import {  OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";

import { Model } from "../models/model";
import { DataSourceOptions } from "../data/data-source-options";
import { Override } from "../decorators/override";
import { ViewModel } from "../models/view-model";
import { IModelService } from "../services/imodel-service";

export abstract class ModelFieldDirective<T extends Model , TV extends ViewModel<T>, TKey = number> 
                extends SelectBoxFieldDirective<TV,TKey> implements OnInit,OnDestroy {

    private _modelService:IModelService<T,TKey>;
    constructor(hostItem: DxiItemComponent,private viewContaiberRef: ViewContainerRef,modelService:IModelService<T,TKey>){
        super(hostItem,viewContaiberRef);
        this._modelService = modelService;
    }
   
    @Override()
    protected setInitialValues():void{
       super.setInitialValues();
       this.valueExpr = "Entity.Id";
       this.displayExpr = "Entity.Name";

       this.modelFieldSourcePath = "Entity";

    }

    protected get modelService():IModelService<T,TKey>{
        return this._modelService;
    }


    @Override()
    public loadData(options?:DataSourceOptions,reset:boolean = false){
       if(this.editorInstance){
           let dataSourceOptions: DataSourceOptions = this.defaultDataSourceOptions;

           if(options){
               dataSourceOptions = options;
           }

           if(this.hasParentField){
               dataSourceOptions = this.addQueryParams(dataSourceOptions);

           }
           let curentlyValue:TKey = this.getModelValueOfField(this);
           if(this.hasParentField && reset === false && this.isModelLoading === false){
               this.setKeyMapValue(null);
           }
           //this.editorInstance.option('dataSource',this.modelService.getODataSource(dataSourceOptions));
           if(this.isModelLoading === false){
               if(reset ===true){
                   this.editorInstance.reset();
               }else{
                   this.setValue(currentValue);
               }
           }
           this.onDataLoaded();         
       }
    }

    @Override()
    protected isLoadOnInitEnabled():boolean{  
        return this.hasParentField === false;
    }
   

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
       super.ngOnDestroy();
    }

    
    
}