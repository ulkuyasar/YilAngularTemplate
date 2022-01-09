import { AfterContentInit, AfterViewInit, Component, ComponentRef, ContentChild, ContentChildren, EventEmitter, Input, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChange, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import DevExpress from "devextreme";
import { DxDataGridComponent, DxTemplateDirective, DxTemplateHost, IDxTemplateHost, INestedOptionContainer, NestedOptionHost } from "devextreme-angular";
import { DxiColumnComponent, DxoColumnChooserComponent, DxoColumnFixingComponent, DxoEditingComponent, DxoFilterRowComponent, DxoGroupPanelComponent, DxoHeaderFilterComponent, DxoLoadPanelComponent, DxoPagerComponent, DxoPagingComponent, DxoRemoteOperationsComponent, DxoScrollingComponent, DxoSelectionComponent, DxoSortingComponent, DxoSummaryComponent } from "devextreme-angular/ui/nested";
import { template } from "lodash";
import { Subscription } from "rxjs";
import { BaseComponent } from "src/app/core/components/base-component";
import { ListComponent } from "src/app/core/components/list-component";
import { QueryStringParam } from "src/app/core/data/query-string-param";
import { IButtonOptions } from "src/app/devextreme/interfaces/button/ibutton-options";
import { ICellInfo } from "src/app/devextreme/interfaces/grid/icell-info";
import { GridEditMode } from "./grid-edit-mode.enum";


@Component({
  selector: 'app-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['./grid-toolbar.component.css'],
  providers:[NestedOptionHost,DxTemplateHost],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(GridViewComponent,"GridViewComponent")
export class GridViewComponent extends BaseComponent implements OnInit,OnDestroy,AfterViewInit,
                                AfterContentInit, INestedOptionContainer, IDxTemplateHost,IGridView{
 
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

   @Input('wordWrapEnabled')
   wordWrapEnabled:boolean=false;

   @Input('cellHintEnabled')
   cellHintEnabled:boolean=true;

   @Input('showBorders')
   showBorders:boolean=true;

   @Input('showColumnHeaders')
   showColumnHeaders:boolean=true;

   @Input('showColumnLines')
   showColumnLines:boolean=true;

   @Input('showRowLines')
   showRowLines:boolean=true;

   @Input('focusedColumnIndex')
   focusedColumnIndex:number=-1;

   @Input('focusedRowEnabled')
   focusedRowEnabled:boolean=false;

   @Input('focusedRowIndex')
   focusedRowIndex:number=-1;

   @Input('focusedRowKey')
   focusedRowKey:any;

   @Input('focusedStateEnabled')
   focusedStateEnabled:boolean=false;

   @Input('renderAsync')
   renderAsync:boolean=true;

   @Input('repaintChangesOnly')
   repaintChangesOnly:boolean=false;



  @Output('onSelectionChanged')
  selectionChangedEvent = new EventEmitter<any>();

  @Output('onContentReady')
  contentReadyEvent = new EventEmitter<any>();

  @Output('onExporting')
  exportingEvent = new EventEmitter<any>();

  @Output('onCellPrepared')
  cellPreparedEvent = new EventEmitter<any>();

  @Output('onRowClick')
  rowClickEvent = new EventEmitter<any>();

  @Output('onRowCollapsed')
  rowCollapsedEvent = new EventEmitter<any>();

  @Output('onRowCollapsing')
  rowCollapsingEvent = new EventEmitter<any>();

  @Output('onRowExpanded')
  rowExpandedEvent = new EventEmitter<any>();

  @Output('onRowExpanding')
  rowExpandingEvent = new EventEmitter<any>();

  @Output('onRowInserted')
  rowInsertedEvent = new EventEmitter<any>();

  @Output('onRowInserting')
  rowInsertingEvent = new EventEmitter<any>();

  @Output('onRowPrepared')
  rowPreparedEvent = new EventEmitter<any>();

  @Output('onRowRemoved')
  rowRemovedEvent = new EventEmitter<any>();

  @Output('onRowRemoving')
  rowRemovingEvent = new EventEmitter<any>();

  @Output('onRowUpdated')
  rowUpdatedEvent = new EventEmitter<any>();

  @Output('onRowUpdating')
  rowUpdatingEvent = new EventEmitter<any>();

  @Output('onEditingStart')
  editingStartEvent = new EventEmitter<any>();

  @Output('onToolbarPreparing')
  toolbarPreparingEvent = new EventEmitter<any>();

  @Output('onCustomizeExcelCell')
  customizeExcelCellEvent = new EventEmitter<any>();

  @Output('onRowDoubleClick')
  rowDoubleClickEvent = new EventEmitter<any>();

  parentListComponent : ListComponent;
  cellButtonsContainerDivID:string;
  selectedRowKeys = [];
  editMode :GridEditMode = GridEditMode.Custom;

  private _templates : DxTemplateDirective[] = new Array<DxTemplateDirective>();
  private _cellButtonsColumn : IButtonOptions;
  private _cellButtonsMap : Map<number,GridCellButtonsHostComponent> = new  Map<number,GridCellButtonsHostComponent>();
  private _cellButtonsPropertyChangedSubscription: Subscription;

  constructor(private nestedOptionHost:NestedOptionHost,private templateHost:DxTemplateHost,
              private renderer2:Renderer2,viewContainerRef:ViewContainerRef){

                super(viewContainerRef);
                this.nestedOptionHost.setHost(this);
                this.templateHost.setHost(this);
                this.cellButtonsContainerDivID=`gridView_cell_buttons_container_${this.componentID}`;
                this.keyExpr = 'Id';
   }

   customizeExcelCell(data:any){
     this.onCustomizeExcelCell(data);
   }

   onCustomizeExcelCell(data:any){
      let handled:boolean = false;
      if(this.customizeExcellCellEvent.observers.length > 0){
        handled = true;
        this.customizeExcellCellEvent.emit(data);
      }
      return handled;
   }

   get instance():DevExpress.ui.dxDataGrid{
       return this.dataGrid.instance;
   }

   get isLinked():boolean{
    return this.dataGrid.isLinked;
   }

   get optionChangeHandlers():EventEmitter<any>{
    return new EventEmitter<any>();
   }

   setTemplate(template:DxTemplateDirective){
     this._template.push(template);
   }

   private subscribeToCellButtonsPropertyChanged():void{
     if (this.cellButtonsComponent){
       if (!this._cellButtonsPropertyChangedSubscription){
        this._cellButtonsPropertyChangedSubscription = this.cellButtonsComponent.propertyChangedEvent.subscribe(
          (changes:SimpleChange) =>{
            if(this._cellButtonsColumn && changes["visible"]){
              this._cellButtonsColumn.visible = changes["visible"].currentVlue;
              this.dataGrid.instance.columnOption("cellButtons","visible",this._cellButtonsColumn.visible);
            }
          });
       }
     }
   }

   private unsubscribeFromCellButtonsPropertyChanged():void{
    if (this._cellButtonsPropertyChangedSubscription){
      this._cellButtonsPropertyChangedSubscription.unsubscribe();
      this._cellButtonsPropertyChangedSubscription = null;
    }
   }

   ngOnInit() {
     super.ngOnInit();
     this.dataGrid.dataSourceChange.subscribe((args?:string|any[]|DevExpress.data.DataSource | DevExpress.data.DataSourceOptions) =>{
       this.dataSourceChanged(args);
     });
     this.subscribeToCellButtonsPropertyChanged();
       
   }

   ngOnDestroy() {
    
    this.unsubscribeFromCellButtonsPropertyChanged();
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    let onlyList:boolean = false;
    if(this.cellButtonsComponent && this.cellButtonsComponent.visible===true && onlyList===false){
      let onlyCustomActions: boolean = this.editMode !== GridEditMode.Custom
      this.prepareCellButtons(onlyCustomActions);
    }
  }

  ngAfterContentInit() {
    this.configureColumns();
    this.configureColumnChooser();
    this.configureEditing();
    this.configureSummary();
    this.configurePager();
    this.configurePaging();
    this.configureColumnFixing();
    this.configureSelection();
    this.configureGroupPanel();
    this.configureFilterRow();
    this.configureExport();
    this.configureHeaderFilter();
    this.configureSorting();
    this.configureLoadPanel();
    this.configureScrolling();
    this.configureRemoteOperations();
    this.configureToolbar();
    this.configureFooter();
    this.configureTemplates();

  }


   private configureColumns(){   
      if (this.columnsChildren && this.columnsChildren.length >0){
        this.dataGrid.columnsChildren = this.columnsChildren;
      }else{
        this.dataGrid.columns = this.columns;
      }

      Object.defineProperties(this.dataGrid,"columnsChildren",{writable:true});
   } 




   private  configureColumnChooser(){  
      if (!this.columnChooser){
        let defaultCollumnChooser : DxoColumnChooserComponent = new DxoColumnChooserComponent(this.nestedOptionHost,this.nestedOptionHost);
        defaultCollumnChooser.enabled = false;
        defaultCollumnChooser.mode = 'select';
        this.columnChooser = defaultCollumnChooser;      
      }
      this.columnChooser.setHost(this,(<any>this.columnChooser)._optionPath);
      this.dataGrid.columnChooser = this.columnChooser;
    } 

    private configureSummary(){ 
      if (this.summary){
        this.summary.setHost(this,(<any>this.summary)._optionPath);
        this.dataGrid.summary = this.summary;
        Object.defineProperties(this.dataGrid,"summary",{writable:true});
      }
    } 



    private configureEditing(){ 
      if (this.editing){
        if (!this.editing.texts){
          this.editing.texts = {confirmDeleteMessage:''};
        }

        if (!this.editing.texts.confirmDeleteMessage){
          this.editing.texts.confirmDeleteMessage = '';
        }


        this.editing.setHost(this,(<any>this.editing)._optionPath);
        this.dataGrid.editing = <{ allowAdding?:boolean;allowDeleting?:boolean | Function; allowUpdating?:boolean | Function; forms:DataYasar };
        this.editMode = GridEditMode.Inline;
      }else{
        //cell buttons
        if(!this.cellButtonsComponent){
          let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GridCellButtonsComponent);
          let componentRef:ComponentRef<GridCellButtonsComponent> = this.cellButtonsContainer.createComponent(componentFactory);
          this.cellButtonsComponent = componentRef.instance;

        }

        this.cellButtonsComponent.useRoute = this.useRoute;
        this.editMode = GridEditMode.Custom;
      }
    } 

    private configurePaging(){     
      if (!this.paging){
        let defaultPaging:DxoPagingComponent = new DxoPagingComponent(this.nestedOptionHost,this.nestedOptionHost);
        defaultPaging.enabled = true;
        defaultPaging.pageSize=20;
        defaultPaging.pageIndex = 0;
        this.paging =defaultPaging;
      }

      this.paging.setHost(this,(<any>this.paging)._optionPath);
      this.dataGrid.paging = this.paging;
    } 
    
    private configurePager(){   

      if (!this.pager){
        let defaultPager:DxoPagerComponent = new DxoPagerComponent(this.nestedOptionHost,this.nestedOptionHost);
        defaultPager.showPageSizeSelector = true;
        defaultPager.showNavigationButtons=true;
        defaultPager.allowedPageSizes = [10,20,50];
        defaultPager.showInfo = true;
        defaultPager.visible=true;
        this.pager = defaultPager;
      }
      this.pager.setHost(this,(<any>this.pager)._optionPath);
      this.dataGrid.pager = this.pager;
    } 
    
    private configureColumnFixing(){ 
      if (!this.columnFixing){
        this.columnFixing = new DxoColumnFixingComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.columnFixing.enabled=true;
      }
      this.columnFixing.setHost(this,(<any>this.columnFixing)._optionPath);
      this.dataGrid.columnFixing = this.columnFixing;


    } 
    private configureSelection(){  

      if (!this.selection){
        this.selection = new DxoSelectionComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.selection.mode= 'multiple';
        this.selection.selectAllMode= 'page';
        this.selection.showCheckBoxesMode= 'none';

      }
      this.selection.setHost(this,(<any>this.selection)._optionPath);
      this.dataGrid.selection = this.selection;

    } 
    private configureGroupPanel(){

      if (!this.groupPanel){
        this.groupPanel = new DxoGroupPanelComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.groupPanel.visible= false;
      }
      this.groupPanel.setHost(this,(<any>this.groupPanel)._optionPath);
      this.dataGrid.groupPanel = this.groupPanel;

    } 
    
    private configureFilterRow(){  
      if (!this.filterRow){
        this.filterRow = new DxoFilterRowComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.filterRow.visible= false;
      }
      this.filterRow.setHost(this,(<any>this.filterRow)._optionPath);
      this.dataGrid.filterRow = this.filterRow;
    } 
    
    private configureExport(){ 
      this.dataGrid.export.customizeExcelCell = (data:any) => this.customizeExcelCell(data);
    }

    private configureHeaderFilter(){ 
      if (!this.headerFilter){
        this.headerFilter = new DxoHeaderFilterComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.headerFilter.visible= false;
      }
      this.headerFilter.setHost(this,(<any>this.headerFilter)._optionPath);
      this.dataGrid.headerFilter = this.headerFilter;
    } 
    
    private configureSorting(){ 
      if (!this.sorting){
        this.sorting = new DxoSortingComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.sorting.mode= 'multiple';
      }
      this.sorting.setHost(this,(<any>this.sorting)._optionPath);
      this.dataGrid.sorting = this.sorting;
    } 


    private configureLoadPanel(){   

      if (!this.loadPanel){
        this.loadPanel = new DxoLoadPanelComponent(this.nestedOptionHost,this.nestedOptionHost);
        this.loadPanel.enabled= true;
        this.loadPanel.shading= true;
        this.loadPanel.showIndicator= true;
        this.loadPanel.showPane= true;
      }
      this.loadPanel.setHost(this,(<any>this.loadPanel)._optionPath);
      this.dataGrid.loadPanel = this.loadPanel;

    } 
    private configureScrolling(){ 
      if (!this.scrolling){
        this.scrolling.setHost(this,(<any>this.scrolling)._optionPath);
        this.dataGrid.scrolling = this.scrolling;
      }
    } 
    private configureRemoteOperations(){ 
      if (!this.remoteOperations){
        this.remoteOperations.setHost(this,(<any>this.remoteOperations)._optionPath);
        this.dataGrid.remoteOperations = this.remoteOperations;
      }else{
        // CustomStore seçildiginde duzenlenecek
      }
    } 
    private configureToolbar(){   

      if (this.showToolbar===true){
        if (!this.toolbarComponent){
          let interval = setInterval(()=>{
            clearInterval(interval);
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GridToolbarComponent);
            let componentRef:ComponentRef<GridToolbarComponent> = this.componentFactory.create(this.Injector);
            this.toolbarComponent.insert(componentRef.hostView);
            this.toolbarComponent = componentRef.instance;
            this.toolbarComponent.gridView = this;           
          },10);
        }
        else{
            this.toolbarComponent.gridView = this;
        }
        this.renderer2.setStyle(this.toolbarContainerDiv.nativeElement,'display','');
      }else
      {
        this.renderer2.setStyle(this.toolbarContainerDiv.nativeElement,'display','none');
      }
    }
    
    
    private configureFooter(){ 

      if (this.showFooter === true){
        if (!this.footerComponent){
          let interval = setInterval(()=>{
            clearInterval(interval);
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GridFooterComponent);
            let componentRef:ComponentRef<GridFooterComponent> = this.componentFactory.create(this.Injector);
            this.footerComponent = componentRef.instance;
            this.footerComponent.gridView = this;           
          },10);
        }
        else{
            this.footerComponent.gridView = this;
        }
      }
    } 
    
    private configureTemplates(){   
      if (this._templates){
        this._templates.forEach(template=>this.dataGrid.templates.push(template));
      }
    } 

    public prepareCellButtons(onlyCustomActions:boolean = false):IColumnOptions{
      let columnOptions:IColumnOptions = {};
      columnOptions.name = "cellButtons";
      columnOptions.width = this.cellButtonsComponent.width;
      columnOptions.dataField = this.keyExpr;
      columnOptions.cellTemplate = (cellElement:any,cellInfo:ICellInfo)=>{
        this.createCellButoonsTemplate(cellElement,cellInfo,onlyCustomActions);
      }
      columnOptions.showInColumnChooser = false;
      columnOptions.caption = '';
      columnOptions.visibleIndex = 0;
      columnOptions.alignment = 'left';
      columnOptions.allowFiltering = false;
      columnOptions.allowExporting = false;
      columnOptions.allowEditing = false;
      columnOptions.allowGrouping = false;
      columnOptions.allowHeaderFiltering = false;
      columnOptions.allowHiding = false;
      columnOptions.allowReordering = false;
      columnOptions.allowResizing = false;
      columnOptions.allowSearch = false;
      columnOptions.allowSorting = false;
      columnOptions.autoExpandGroup = false;
      this.dataGrid.instance.addColumn(columnOptions);
      return columnOptions;
    }

    private createCellButtonsTemplate(cellElement:any,cellInfo:ICellInfo,onlyCustomActions:boolean){
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GridCellButtonsHostComponent);
      let componentRef:ComponentRef<GridCellButtonsHostComponent> = this.cellButtonsContainer.createComponent(componentFactory);
      let cellButtonsHostComponent:GridCellButtonsHostComponent = componentRef.instance;
      cellButtonsHostComponent.gridView = this;
      cellButtonsHostComponent.useRoute = this.useRoute;
      cellButtonsHostComponent.cellElement = cellElement;
      cellButtonsHostComponent.cellInfo = cellInfo;

      cellButtonsHostComponent.allowAdd = onlyCustomActions == false && this.cellButtonsComponent.allowAdd;
      cellButtonsHostComponent.allowEdit = onlyCustomActions == false && this.cellButtonsComponent.allowEdit;
      cellButtonsHostComponent.allowDelete = onlyCustomActions == false && this.cellButtonsComponent.allowDelete;
      cellButtonsHostComponent.addIcon = this.cellButtonsComponent.addIcon;
      cellButtonsHostComponent.editIcon = this.cellButtonsComponent.editIcon;
      cellButtonsHostComponent.deleteIcon = this.cellButtonsComponent.deleteIcon;
      cellButtonsHostComponent.addToolTip = this.cellButtonsComponent.addToolTip;
      cellButtonsHostComponent.deleteToolTip = this.cellButtonsComponent.deleteToolTip;

      cellButtonsHostComponent.addButtonClickEvent = this.cellButtonsComponent.addButtonClickEvent;
      cellButtonsHostComponent.editButtonClickEvent = this.cellButtonsComponent.editButtonClickEvent;
      cellButtonsHostComponent.deleteButtonClickEvent = this.cellButtonsComponent.deleteButtonClickEvent;

      cellButtonsHostComponent.canAddButtonBeVisible = this.cellButtonsComponent.canAddButtonBeVisible;
      cellButtonsHostComponent.canEditButtonBeVisible = this.cellButtonsComponent.canEditButtonBeVisible;
      cellButtonsHostComponent.canDeleteButtonBeVisible = this.cellButtonsComponent.canDeleteButtonBeVisible;
      cellButtonsHostComponent.overrideActionVisibility = this.cellButtonsComponent.overrideActionVisibility;
      //cellbuttonsPrepring eventta tum component gonderiliyor. Buna gerek yok. duzeltilmesi lazım
      this.cellButtonsHostComponent.onCellButtonsPreparing(cellButtonsHostComponent);
      let cellButtons:GridCellButtonComponent[] = this.cellButtonsHostComponent.cellButtons.toArray();
      if (cellButtons && cellButtons.length>0){
        cellButtons.forEach((button:GridCellButtonComponent) => {
            button.cellInfo = cellInfo;
            this.cellButtonsComponent.onCellButtonsPreparing(button);
        });
        this.cellButtonsComponent.cellButtons = cellButtons;
      }
      this._cellButtonsMap.set(cellInfo.rowIndex,cellButtonsHostComponent);

    }

    public getCellButtons(rowIndex:number):GridCellButtonsHostComponent{
      if(this._cellButtonsMap.has(rowIndex)){
        return this._cellButtonsMap.get(rowIndex);
      }else{
        return null;
      }
    }

    public getCurrentCellButtons(rowIndex:number):GridCellButtonsHostComponent{
      return this.getCellButtons(this.getCurrentRowIndex());
    }

    private onSelectionChanged(data:any):boolean{
      let handled:boolean=false;
      if (this.selectionChangedEvent.observers.length >0){
        handled = true;
        this.selectionChangedEvent.emit(data);
      }
      return handled;
    }

    private onContentReady(data:any):boolean{
      let handled:boolean=false;
      if (this.contentReadyEvent.observers.length >0){
        handled = true;
        this.contentReadyEvent.emit(data);
      }
      return handled;
    }

    private onExporting(data:any):boolean{
      let handled:boolean=false;
      if (this.exportingEvent.observers.length >0){
        handled = true;
        this.exportingEvent.emit(data);
      }
      return handled;
    }

    private onCellPrepared(data:any):boolean{
      let handled:boolean=false;
      if (this.cellPreparedEvent.observers.length >0){
        handled = true;
        this.cellPreparedEvent.emit(data);
      }
      return handled;
    }

    private onRowClick(data:any):boolean{
      let handled:boolean=false;
      if (this.rowClickEvent.observers.length >0){
        handled = true;
        this.rowClickEvent.emit(data);
      }
      return handled;
    }

    private onRowCollapsed(data:any):boolean{
      let handled:boolean=false;
      if (this.rowCollapsedEvent.observers.length >0){
        handled = true;
        this.rowCollapsedEvent.emit(data);
      }
      return handled;
    }

    private onRowCollapsingEvent(data:any):boolean{
      let handled:boolean=false;
      if (this.rowCollapsingEvent.observers.length >0){
        handled = true;
        this.rowCollapsingEvent.emit(data);
      }
      return handled;
    }

    private onRowExpanded(data:any):boolean{
      let handled:boolean=false;
      if (this.rowExpandedEvent.observers.length >0){
        handled = true;
        this.rowExpandedEvent.emit(data);
      }
      return handled;
    }

    private onRowExpanding(data:any):boolean{
      let handled:boolean=false;
      if (this.rowExpandingEvent.observers.length >0){
        handled = true;
        this.rowExpandingEvent.emit(data);
      }
      return handled;
    }

    private onRowInserted(data:any):boolean{
      let handled:boolean=false;
      if (this.rowInsertedEvent.observers.length >0){
        handled = true;
        this.rowInsertedEvent.emit(data);
      }
      return handled;
    }

    private onRowInserting(data:any):boolean{
      let handled:boolean=false;
      if (this.rowInsertingEvent.observers.length >0){
        handled = true;
        this.rowInsertingEvent.emit(data);
      }
      return handled;
    }

    private onRowPrepared(data:any):boolean{
      let handled:boolean=false;
      if (this.rowPreparedEvent.observers.length >0){
        handled = true;
        this.rowPreparedEvent.emit(data);
      }
      return handled;
    }

    private onRowRemoved(data:any):boolean{
      let handled:boolean=false;
      if (this.rowRemovedEvent.observers.length >0){
        handled = true;
        this.rowRemovedEvent.emit(data);
      }
      return handled;
    }

    private onRowRemoving(data:any):boolean{
      let handled:boolean=false;
      if (this.rowRemovingEvent.observers.length >0){
        handled = true;
        this.rowRemovingEvent.emit(data);
      }
      return handled;
    }

    private onRowUpdated(data:any):boolean{
      let handled:boolean=false;
      if (this.rowUpdatedEvent.observers.length >0){
        handled = true;
        this.rowUpdatedEvent.emit(data);
      }
      return handled;
    }

    private onRowUpdating(data:any):boolean{
      let handled:boolean=false;
      if (this.rowUpdatingEvent.observers.length >0){
        handled = true;
        this.rowUpdatingEvent.emit(data);
      }
      return handled;
    }

    private onEditingStart(data:any):boolean{
      let handled:boolean=false;
      if (this.edittingStartEvent.observers.length >0){
        handled = true;
        this.edittingStartEvent.emit(data);
      }
      return handled;
    }

    private onDataErrorOccurred(data:any):boolean{
      let handled:boolean=false;
      if (this.dataErrorOccurredEvent.observers.length >0){
        handled = true;
        this.dataErrorOccurredEvent.emit(data);
      }
      return handled;
    }


    private onToolbarPreparing(data:any):boolean{
      let handled:boolean=false;
      if (this.dataErrorOccurredEvent.observers.length >0){
        handled = true;
        this.dataErrorOccurredEvent.emit(data);
      }
      return handled;
    }

    private onRowDoubleClick(data:any):boolean{
      let handled:boolean=false;
      if (this.rowDoubleClickEvent.observers.length >0){
        handled = true;
        this.rowDoubleClickEvent.emit(data);
      }
      return handled;
    }


    private selectionChanged(args:any):void{
      let dataContext = this.dataContext;
      let selectedKeys:Array<any> = this.getSelectedRowKeys();
      if (selectedKeys && selectedKeys.length>0 && dataContext.items){
        dataContext.position = dataContext.items.findIndex(d=>d.Id===selectedKeys[0])
        dataContext.selectedPositions = [];
        selectedKeys.forEach(key => {
          let index:number = dataContext.items.findIndex(d=>d.Id===key);
          if (index >=0){
            dataContext.selectedPositions.push(index);
          }
        });
      }else{
        dataContext.position = -1;
        dataContext.selectedPositions = null;
      }

      if (this.onSelectionChanged(args)){
        return;
      }
    }

    public contentReady(args:any):void{
      if (this.onContentReady(args)){
        return;
      }
    }

    public exporting(args:any):void{
      if (this.onExporting(args)){
        return;
      }
    }

    public cellPrepared(args:any):void{
      if (this.onCellPrepared(args)){
        return;
      }
    }

    public rowClick(args:any):void{
      if (this.onRowClick(args)){
        return;
      }
    }

    public rowCollapsed(args:any):void{
      if (this.onRowCollapsed(args)){
        return;
      }
    }

    public rowCollapsing(args:any):void{
      if (this.onRowCollapsing(args)){
        return;
      }
    }

    public rowExpanded(args:any):void{
      if (this.onRowExpanded(args)){
        return;
      }
    }

    public rowExpanding(args:any):void{
      if (this.onRowExpanding(args)){
        return;
      }
    }

    public rowInserted(args:any):void{
      if (this.onRowInserted(args)){
        return;
      }
    }

    public rowInserting(args:any):void{
      if (this.onRowInserting(args)){
        return;
      }
    }
    public rowPrepared(args:any):void{
      if (this.onRowPrepared(args)){
        return;
      }
    }

    public rowRemoved(args:any):void{
      if (this.onRowRemoved(args)){
        return;
      }
    }

    public rowRemoving(args:any):void{
      if (this.onRowRemoving(args)){
        return;
      }
    }

    public rowUpdated(args:any):void{
      if (this.onRowUpdated(args)){
        return;
      }
    }

    public rowUpdating(args:any):void{
      if (this.onRowUpdating(args)){
        return;
      }
    }

    public edittingStart(args:any):void{
      if (args.key!== undefined && args.key!== null){
        let rowKey = args.key;
        this.selectedRowKeys(rowKey,false);
      }
      if(this.onEditingStart(args)){
        return;
      }
    }

    public dataErrorOccured(args:any):void{
      if (args.error && args.error.errorDetails && args.error.errorDetails.message){
        args.error.message =  args.error.errorDetails.message;
      }

      if (this.onDataErrorOccurred(args)){
        return;
      }
    }

    public toolbarPreparing(args:any):void{
        if (this.onToolbarPreparing(args)){
          return;
        }
    }

    yasarrrrr asagisini acmalisin
    // refreshData():Promise<void> && JQueryPromise<void>{
    //     return this.dataGrid.instance.refresh();
    // }

    clearSelection():void{
      this.dataGrid.instance.clearSelection();
    }

    showColumnChooser():void{
      this.dataGrid.instance.showColumnChooser();
    }

    exportToExcel(selectedRows:boolean):void{
      this.dataGrid.instance.exportToExcel(selectedRows);
    }

    getSelectedRowKeys<T=any>():T[]{
      return this.dataGrid.instance.getSelectedRowKeys();
    }

    getSelectedRowsData<T=any>():T[]{
      return this.dataGrid.instance.getSelectedRowsData();
    }

    getRowIndexByKey(key:any):number{
      return this.dataGrid.instance.getRowIndexByKey(key);
    }

    getCurrentRowIndex(key:any):number{
      let currentItem = this.dataContext.current;
      if(currentItem){
        return this.getRowIndexByKey(currentItem.Id);
      }
      return -1;
      
    }

    selectRowsByIndexes(rowIndex:number | number[]): Promise<void> & JQueryPromise<void> {
      let indexes: number[] = rowIndex instanceof Array ? rowIndex : [rowIndex];
      return this.dataGrid.instance.selectRowsByIndexes(keys,preserve);
    }

    selectRowsByKeys(rowKey:any|any[],preserve:boolean): Promise<void> & JQueryPromise<void> {
      let keys: any[] = rowKey instanceof Array ? rowKey : [rowKey];
      return this.dataGrid.instance.selectRows(keys,preserve);
    }

    private dataSourceChanged(args?:string | any[] | DevExpress.data.DataSource | DevExpress.data.DataSourceOptions){
      if(args instanceof Array){
        this.dataGrid.keyExpr = this.keyExpr;
      }
    }

    getCurrentItem<T=object>():T{
      return this.dataContext.current as T;
    }

    getSelectedItems<T=object>():T[]{
      return this.dataContext.selectedItems as T[];
    }

    newItem():void{
      if(this.editMode === GridEditMode.Custom){
        if(this.useRoute === true){
          this.navigator.navigate({Path:'add',RelativeTo:this.activatedRoute});
        }
      }else if(this.editMode === GridEditMode.Inline){
        this.dataGrid.instance.addRow();
      }
    }

    editItem():void{
      let currentItem = this.dataContext.current;
      if(this.editMode === GridEditMode.Custom){
        if(this.useRoute === true){
          this.navigator.navigate({Path:'edit',Args:[currentItem.Id], RelativeTo:this.activatedRoute});
        }
      }else if(this.editMode === GridEditMode.Inline){
        if (this.editing.allowUpdating === true){
          let rowIndex : number = this.getRowIndexByKey(currentItem.Id);
          this.dataGrid.instance.editRow(rowIndex);
        }        
      }
    }

    deleteItem():void{
      let currentItem = this.dataContext.current;
      if(this.editMode === GridEditMode.Custom){
        if(this.parentListComponent){
          this.parentListComponent.deleteItem(currentItem.Id);
        }
      }else if(this.editMode === GridEditMode.Inline){
        if (this.editing.allowUpdating === true){
          let rowIndex : number = this.getRowIndexByKey(currentItem.Id);
          this.dataGrid.instance.editRow(rowIndex);
        }        
      }
    }

}