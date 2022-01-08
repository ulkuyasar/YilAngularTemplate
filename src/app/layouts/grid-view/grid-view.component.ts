import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, Input, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import DevExpress from "devextreme";
import { DxDataGridComponent, DxTemplateHost, IDxTemplateHost, INestedOptionContainer, NestedOptionHost } from "devextreme-angular";
import { DxiColumnComponent, DxoColumnChooserComponent, DxoColumnFixingComponent, DxoEditingComponent, DxoFilterRowComponent, DxoGroupPanelComponent, DxoHeaderFilterComponent, DxoLoadPanelComponent, DxoPagerComponent, DxoPagingComponent, DxoRemoteOperationsComponent, DxoScrollingComponent, DxoSelectionComponent, DxoSortingComponent, DxoSummaryComponent } from "devextreme-angular/ui/nested";
import { BaseComponent } from "src/app/core/components/base-component";
import { QueryStringParam } from "src/app/core/data/query-string-param";


@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
  providers:[NestedOptionHost,DxTemplateHost],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(GridViewComponent,"GridViewComponent")
export class GridViewComponent extends BaseComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit, INestedOptionContainer, IDxTemplateHost,IGridView{
 
  @ContentChildren(DxiColumnComponent)
  columnChildren:QueryList<DxiColumnComponent>

  @ContentChild(DxoColumnChooserComponent, {static:false})
  columnChooser:DxoColumnChooserComponent;

  @ContentChild(DxoSummaryComponent, {static:false})
  summary:DxoSummaryComponent;

  @ContentChild(DxoEditingComponent, {static:false})
  editing:DxoEditingComponent;

  @ContentChild(DxoPagingComponent, {static:false})
  paging:DxoPagingComponent;

  @ContentChild(DxoPagerComponent, {static:false})
  pager:DxoPagerComponent;

  @ContentChild(DxoColumnFixingComponent, {static:false})
  columnFixing:DxoColumnFixingComponent;

  @ContentChild(DxoSelectionComponent, {static:false})
  selection:DxoSelectionComponent;

  @ContentChild(DxoGroupPanelComponent, {static:false})
  groupPanel:DxoGroupPanelComponent;

  @ContentChild(DxoFilterRowComponent, {static:false})
  filterRow:DxoFilterRowComponent;

  @ContentChild(DxoSortingComponent, {static:false})
  sorting:DxoSortingComponent;

  @ContentChild(DxoLoadPanelComponent, {static:false})
  loadPanel:DxoLoadPanelComponent;

  @ContentChild(DxoScrollingComponent, {static:false})
  srolling:DxoScrollingComponent;

  @ContentChild(DxoRemoteOperationsComponent, {static:false})
  remoteOperations:DxoRemoteOperationsComponent;

  @ContentChild(GridToolbarComponent, {static:false})
  toolbarComponent:GridToolbarComponent;

  @ContentChild(GridFooterComponent, {static:false})
  footerComponent:GridFooterComponent;
  
  @ContentChild(GridCellButtonsComponent, {static:false})
  cellButtonsComponent:GridCellButtonsComponent;

  @ContentChild(DxDataGridComponent, {static:false})
  dataGrid:DxDataGridComponent;

   @ViewChild('toolbarContainer',{read:ViewContainerRef,static:true})
   toolbarContainer:ViewContainerRef;

   @ViewChild('cellButtonsContainer',{read:ViewContainerRef,static:true})
   cellButtonsContainer:ViewContainerRef;

   @ViewChild('toolbarContainerDiv',{read:ViewContainerRef,static:true})
   toolbarContainerDiv:ViewContainerRef;

   @Input('keyExpr')
   keyExpr:string;

   @Input('columns')
   columns:Array<DevExpress.ui.dxDataGridColumn>;

   @Input('showToolbar')
   showToolbar:boolean=true;

   
   @Input('showFooter')
   showFooter:boolean=false;

   
   @Input('permanentFilters')
   permanentFilters:Array<QueryStringParam>;

   
   @Input('showPageSizeSelector')
   showPageSizeSelector:boolean=false;

   
   @Input('allowedPageSize')
   allowedPageSize:boolean=false;




   @Input('errorRowEnabled')
   errorRowEnabled:boolean=true;

   
   @Input('disabled')
   disabled:boolean=false;

   @Input('cacheEnabled')
   cacheEnabled:boolean=true;

   @Input('masterDetail')
   masterDetail:any;




   @Input('highlightChanges')
   highlightChanges:boolean=false;

   
   @Input('rowTemplate')
   rowTemplate:string | Function | Node | JQuery;

   @Input('hoverStateEnabled')
   hoverStateEnabled:boolean=false;

   @Input('activeStateEnabled')
   activeStateEnabled:boolean=false;




   
   @Input('rowAlternationEnabled')
   rowAlternationEnabled:boolean=true;

   @Input('allowColumnReordering')
   allowColumnReordering:boolean=true;




   @Input('allowColumnResizing')
   allowColumnResizing:boolean=true;

   @Input('columnResizingMode')
   columnResizingMode:string="widget";

   @Input('columnHidingEnabled')
   columnHidingEnabled:boolean=false;

   @Input('columnAutoWidth')
   columnAutoWidth:boolean=true;




}