import {  AfterContentInit, Component,  EventEmitter,  Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { FormComponent } from "src/app/core/components/form-component";
import { DxTemplateDirective, DxTemplateHost, DxTextBoxComponent, IDxTemplateHost, INestedOptionContainer, NestedOptionHost } from "devextreme-angular";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { GridViewComponent } from "../grid-view/grid-view.component";
import { ListComponent } from "src/app/core/components/list-component";
import { FilterModel } from "src/app/core/models/filter-model";
import DevExpress from "devextreme";
import { Override } from "src/app/core/decorators/override";
import { QueryStringParam } from "src/app/core/data/query-string-param";
import { IGridView } from "../igrid-view";
import { DataSourceOptions } from "src/app/core/data/data-source-options";

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  providers:[NestedOptionHost,DxTemplateHost],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(FilterPanelComponent,"FilterPanelComponent")
export class FilterPanelComponent extends FormComponent implements OnInit,OnDestroy,AfterContentInit,INestedOptionContainer,IDxTemplateHost{
 

   getSizeQualifier(width:number){
      if(width <=767) return "xs";
      if(width <=1220) return "sm";
      if(width <=1700) return "md";
      return "lg";
   }

   @ViewChild('itemHost',{static:false})
   itemHost: DxiItemComponent;
   
   @ViewChild('txtSearchKey',{static:false})
   txtSearchKey: DxTextBoxComponent;

   @Input()
   grid: GridViewComponent | GridTreeComponent | ListComponent | Array<GridViewComponent | GridTreeComponent | ListComponent>;

   @Input()
   filterModel: FilterModel = {};

   @Input()
   alignItemLabels: boolean;

   @Input()
   alignItemLabelsInAllGroups: boolean;

   @Input()
   showFilterButton: boolean=true;

   @Input()
   collapsePanel: boolean=false;

   @Input()
   collapseText: string;

   @Input()
   items: any; // Array<DexExpress.ui.dxFormSimpleItem | DexExpress.ui.dxFormGroupItem | DexExpress.ui.dxFormTabbedItem | DexExpress.ui.dxFormEmptyItem

   @Output('onFilter')
   filterEvent:EventEmitter<FilterModel>;

   isCollapsed:boolean=true;

   buttonOptions={
      text:this.localization.getMessage("global.filter"),
      icon:"Find",
      onclick: () => this.filter()
   };

   private _templates: DxTemplateDirective[] = new Array<DxTemplateDirective>();

   constructor(private nestedOptionHost : NestedOptionHost, private templateHost:DxTemplateHost, viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         this.nestedOptionHost.setHost(this);
         this.templateHost.setHost(this);
         this.readOnly = false;
         this.filterEvent = new EventEmitter<FilterModel>();

   }
   isLinked: boolean;
   removedNestedComponents: string[];
   optionChangedHandlers: EventEmitter<any>;
   recreatedNestedComponents: any[];
   resetOptions: (collectionName?: string) => void;
   isRecreated: (name: string) => boolean;

   get instance():DevExpress.ui.dxForm{
      return this.form.instance;
   }

   get inLinked():boolean{
      return true;
   }

   get optionChangeHandlers():EventEmitter<any>{
      return new EventEmitter<any>();
   }

   setTemplate(template: DxTemplateDirective){
      this._templates.push(template);
   }

   @Override()
   public model():object{
      return this.filterModel;
   }

   ngOnInit(): void {
       super.ngOnInit();

       if (!this.collapsePanel){
          this.isCollapsed = false;
       }else{
          if(!this.collapseText){
             this.collapseText = this.localization.getMessage("global.list");
          }
       }
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  ngAfterContentInit(){
     this.configureItems();
     this.configureTemplates();
  }

   public fillSelectBox(dataField:string, dataSource:DevExpress.data.DataSource,reset:boolean){
      let selectBox : DevExpress.ui.dxSelectBox = this.form.instance.getEditor(dataField);
      if (selectBox){
         selectBox.option('dataSource',dataSource);
         if (reset){
            selectBox.reset();
         }
      }
   }

   private configureItems(){
      if(this.itemsChildren && this.itemsChildren.length>0){
         this.form.itemsChildren = this.itemsChildren;
      }else{
         this.form.items = this.items;
      }
      Object.defineProperties(this.form,"itemsChildren", { writable :true } );
   }

   private configureTemplates(){
      if(this._templates ){
         this._templates.forEach(template=>this.form.templates.push(template));
      }
   }

   public filter() {
       if (this.filterModel === null || this.filterModel === undefined )
         return;

      if (this.onFilter(this.filterModel)){
         return;
      }
      let filterExpr = new Array<QueryStringParam>();
      for (let key in this.filterModel) {
         if (key != undefined && key!="length" && this.filterModel[key]!=null && this.filterModel[key] != undefined){
            let filterObj = new QueryStringParam();
            filterObj.key = key;
            filterObj.value = this.filterModel[key];
            filterObj.removeQuotes = true;
            filterExpr.push(filterObj);
         }       
      }

      if(this.grid instanceof Array){
         for (const gridItem of this.grid) {
           this.dataBind(gridItem,filterExpr);           
         }
      }else{
         this.dataBind(this.grid,filterExpr);
      }
   }

   private dataBind(grid:GridViewComponent | GridTreeComponent | ListComponent,filterExpr:Array<QueryStringParam>=null){
      if (grid){
         if(grid instanceof GridViewComponent || grid instanceof GridTreeComponent){
            let gridView:IGridView = <IGridView>grid;

            if(gridView.parentListComponent){
               if (gridView.permanentFilters && gridView.permanentFilters.length>0){
                  let newFilter:Array<QueryStringParam> = new Array<QueryStringParam>();

                  filterExpr.forEach(filter=>{
                     newFilter.push(filter);
                  });

                  gridView.permanentFilters.forEach(filter=>{
                     newFilter.push(filter);
                  });

                  gridView.parentListComponent.dataBind(new DataSourceOptions({key:gridView.keyExpr,queryParams:newFilter}));
               }
               else{
                  gridView.parentListComponent.dataBind(new DataSourceOptions({key:gridView.keyExpr,queryParams:filterExpr}));
               }
            }
         }else if (grid instanceof ListComponent){
            grid.dataBind(new DataSourceOptions({key:"Id",queryParams:filterExpr}));
         }
      }
   }

   onFilter(data:any){
      let handled:boolean = false;
      if(this.filterEvent.observers.length>0){
         handled = true;
         this.filterEvent.emit(data);
      }
      return handled;
   }

}
