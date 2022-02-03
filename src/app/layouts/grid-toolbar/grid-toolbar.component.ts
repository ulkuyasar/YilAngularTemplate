import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { toUint8Array } from "js-base64";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import { IButtonClickEventArgs } from "src/app/devextreme/interfaces/button/ibutton-click-event-args";
import { GridEditMode } from "../grid-view/grid-edit-mode.enum";
import { IGridView } from "../igrid-view";
import { MenuItem } from "../menu/menu-item";



@Component({
  selector: 'app-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['./grid-toolbar.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(GridToolbarComponent,"GridToolbarComponent")
export class GridToolbarComponent extends BaseComponent implements OnInit,OnDestroy {

   @Input()
   allowAdd:boolean=true;

   @Input()
   addButtonText:string="grid.toolbar.addbutton.text";

   @Input()
   addButtonIcon:string="icon icon-plus icon-20px";

   @Input()
   allowEdit:boolean=true;

   @Input()
   editButtonText:string="grid.toolbar.editbutton.text";

   @Input()
   editButtonIcon:string="icon icon-pencil icon-20px";

   @Input()
   allowDelete:boolean=true;

   @Input()
   deleteButtonText:string="grid.toolbar.deletebutton.text";

   @Input()
   deleteButtonIcon:string="icon icon-close icon-20px";

   @Input()
   enableRefresh:boolean=false;

   @Input()
   refreshButtonText:string="grid.toolbar.refreshbutton.text";

   @Input()
   refreshButtonIcon:string="icon icon-sync icon-16px";

   @Input()
   enableColumnChooser:boolean=false;

   @Input()
   showColumnChooserButtonText:string="grid.toolbar.columnchooserbutton.text";

   @Input()
   showColumnChooserButtonIcon:string="icon icon-filter icon-16px";

   @Input()
   enableExport:boolean=true;

   @Input()
   enableClearSelection:boolean=true;

   @Input()
   clearSelectionButtonText:string="grid.toolbar.clearSelectionbutton.text";

   @Input()
   clearSelectionButtonIcon:string="icon icon-sync icon-20px";

   @Input()
   enableStates:boolean=false;

   @Input()
   overrideActionVisibility:boolean=false;

    @Output('onAddButtonClick')
    addButtonClickEvent = new EventEmitter<IButtonClickEventArgs>();

    @Output('onEditButtonClick')
    editButtonClickEvent = new EventEmitter<IButtonClickEventArgs>();

    @Output('onDeleteButtonClick')
    deleteButtonClickEvent = new EventEmitter<IButtonClickEventArgs>();

    @Output('onRefreshButtonClick')
    refreshButtonClickEvent = new EventEmitter<IButtonClickEventArgs>();

    gridView:IGridView;
    exportToExcelMenu: MenuItem[];
    status:boolean;

    constructor(viewContainerRef:ViewContainerRef){
      super(viewContainerRef);
      this.exportToExcelMenu = this.createExcelMenu();
      this.status= false;
    }

   ngOnInit() {
     super.ngOnInit();
   }

   ngOnDestroy() {
    super.ngOnDestroy();
  }

  get isAddButtonVisible():boolean{
    let isVisible:boolean=true;
    if (this.allowAdd === false){
      return false;
    }

    if (this.getVisiblityDefaultByLicenseType() === false){
      return false;
    }

    if (this.gridView){
      if (this.gridView.editMode === GridEditMode.Inline){
        if (this.gridView.editing.allowAdding === false){
          return false;
        }
      }

      if (this.gridView.useRoute === false){
        isVisible = this.addButtonClickEvent.observers.length>0;
      }
    }else{
      return false;
    }
    return isVisible;

  }

  get isEditButtonVisible():boolean{
    let isVisible:boolean=true;
    if (this.allowEdit === false){
      return false;
    }

    if (this.getVisiblityDefaultByLicenseType() === false){
      return false;
    }

    if (this.gridView){
      if (this.gridView.editMode === GridEditMode.Inline){
          return false;
      }
    }else{
      return false;
    }
    return isVisible;
  }

  get isDeleteButtonVisible():boolean{
    let isVisible:boolean=true;
    if (this.allowDelete === false){
      return false;
    }

    if (this.getVisiblityDefaultForDeleteLicenseType() === false){
      return false;
    }

    if (this.gridView){
      if (this.gridView.editMode === GridEditMode.Inline){
          return false;
      }
    }else{
      return false;
    }
    return isVisible;
  }

  get isAddButtonDisabled():boolean{
    let isDisabled:boolean=false;
    if (this.allowAdd === false){
      return true;
    };
    return isDisabled;
  }

  get isEditButtonDisabled():boolean{
    let isDisabled:boolean=false;
    if (this.allowEdit === false){
      return true;
    };

    if(this.gridView){
      if (this.gridView.editMode === GridEditMode.Custom){
        let currentModel = this.gridView.getCurrentItem();
        isDisabled = currentModel == null;
      }
    }
    else{
      return true;
    }
    return isDisabled;
  }

  get isDeleteButtonDisabled():boolean{
    let isDisabled:boolean=false;
    if (this.allowDelete === false){
      return true;
    };

    if(this.gridView){
      if (this.gridView.editMode === GridEditMode.Custom){
        let currentModel = this.gridView.getCurrentItem();
        isDisabled = currentModel == null;
      }
    }
    else{
      return true;
    }
    return isDisabled;
  }

  private getVisiblityDefaultByLicenseType():boolean{
    return true;
  }

  private getVisiblityDefaultForDeleteLicenseType():boolean{
    return true;
  }

  private createExcelMenu():MenuItem[]{
    let excelMenu:MenuItem[] = [];
    let mnExportToExcel:MenuItem = new MenuItem();
    mnExportToExcel.Id = 1;
    mnExportToExcel.Code = "mnExportToExcel";
    mnExportToExcel.Caption = this.localization.getMessage('grid.toolbar.exporttoexcel.text');

    let mnExportAll:MenuItem = new MenuItem();
    mnExportAll.Id = 2;
    mnExportAll.Code = "mnExportAll";
    mnExportAll.Caption = this.localization.getMessage('grid.toolbar.exportall.text');
    mnExportAll.ParentID = 1;
    mnExportAll.Action = () => this.exportToExcel();

    let mnExportSelected:MenuItem = new MenuItem();
    mnExportSelected.Id = 3;
    mnExportSelected.Code = "mnExportSelected";
    mnExportSelected.Caption = this.localization.getMessage('grid.toolbar.exportselected.text');
    mnExportSelected.ParentID = 1;
    mnExportSelected.Action = () => this.exportToExcel(true);

    mnExportToExcel.items.push(mnExportAll);
    mnExportToExcel.items.push(mnExportSelected);
    excelMenu.push(mnExportToExcel);
    return excelMenu;
  }

  excelMenuItemClick(item:MenuItem){
    if (item && item.Action){
      if (typeof item.Action === "function"){
        item.Action();
      }
    }
  }

  addButtonClick(args:IButtonClickEventArgs):void{
    if(this.gridView.getSelectedRowKeys().length > 0){
      this.gridView.clearSelection();
    }

    if (this.onAddButtonClick(args)){
      return;
    }

    this.gridView.newItem();
  }

  editButtonClick(args:IButtonClickEventArgs):void{
    if(this.gridView.getSelectedRowKeys().length > 0){
      this.gridView.clearSelection();
    }

    if (this.onEditButtonClick(args)){
      return;
    }

    this.gridView.editItem();
  }

  deleteButtonClick(args:IButtonClickEventArgs):void{
    if(this.gridView.getSelectedRowKeys().length > 0){
      this.gridView.clearSelection();
    }

    if (this.onDeleteButtonClick(args)){
      return;
    }

    this.gridView.deleteItem();
  }

  refreshButtonClick(args:IButtonClickEventArgs):void{

    if (this.onRefreshButtonClick(args)){
      return;
    }

    this.gridView.refreshData();
  }

  clearSelectionButtonClick(args:IButtonClickEventArgs):void{
    this.gridView.clearSelection();
  }

  showColumnChooserButtonClick(args:IButtonClickEventArgs):void{
    this.gridView.showColumnChooser();
  }

  exportToExcel(selectedRows:boolean=false):void{
    this.gridView.exportToExcel(selectedRows);
  }

  onAddButtonClick(args:IButtonClickEventArgs){
    let handled:boolean = false;
    if (this.addButtonClickEvent.observers.length>0){
      handled = true;
      this.addButtonClickEvent.emit(args);
    }
    return handled;
  }

  onEditButtonClick(args:IButtonClickEventArgs){
    let handled:boolean = false;
    if (this.editButtonClickEvent.observers.length>0){
      handled = true;
      this.editButtonClickEvent.emit(args);
    }
    return handled;
  }

  onDeleteButtonClick(args:IButtonClickEventArgs){
    let handled:boolean = false;
    if (this.deleteButtonClickEvent.observers.length>0){
      handled = true;
      this.deleteButtonClickEvent.emit(args);
    }
    return handled;
  }

  onRefreshButtonClick(args:IButtonClickEventArgs){
    let handled:boolean = false;
    if (this.refreshButtonClickEvent.observers.length>0){
      handled = true;
      this.refreshButtonClickEvent.emit(args);
    }
    return handled;
  }


}
