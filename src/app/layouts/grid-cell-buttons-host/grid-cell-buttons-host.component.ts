import { AfterContentInit, Component,  EventEmitter,  Input,  OnDestroy, OnInit, Output,
   SimpleChanges, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import { Model } from "src/app/core/models/model";
import { ICellInfo } from "src/app/devextreme/interfaces/grid/icell-info";
import { GridCellButtonComponent } from "../grid-cell-button/grid-cell-button.component";
import { GridCellButtonsComponent } from "../grid-cell-buttons/grid-cell-buttons.component";
import { IGridView } from "../igrid-view";


@Component({
  selector: 'app-grid-cell-buttons-host',
  templateUrl: './grid-cell-buttons-host.component.html',
  styleUrls: ['./grid-cell-buttons-host.component.css']

})
@ComponentName(GridCellButtonsHostComponent,"GridCellButtonsHostComponent")
export class GridCellButtonsHostComponent extends BaseComponent implements OnInit,OnDestroy{

    gridView:IGridView;
    cellElement:any;
    cellInfo:ICellInfo;

    addButtonName:string = 'addButton';
    editButtonName:string = 'editButton';
    deleteButtonName:string = 'deleteButton';
    allowAdd:boolean=false;
    allowEdit:boolean=true;
    allowDelete:boolean=true;
    addIcon:string;
    editIcon:string;
    deleteIcon:string;
    addToolTip:string;
    editToolTip:string;
    deleteToolTip:string;
    addButtonClickEvent = new EventEmitter<ICellInfo>();
    editButtonClickEvent = new EventEmitter<ICellInfo>();
    deleteButtonClickEvent = new EventEmitter<ICellInfo>();

    canAddButtonBeVisible: (cellInfo:ICellInfo) => boolean;
    canEditButtonBeVisible: (cellInfo:ICellInfo) => boolean;
    canDeleteButtonBeVisible: (cellInfo:ICellInfo) => boolean;

    overrideActionVisibility:boolean=false;
    cellButtons:Array<GridCellButtonComponent>;
    private _isEditButtonClicked:boolean = false;


    constructor(private _authenticationService:AuthenticationService, viewContainerRef:ViewContainerRef){
      super(viewContainerRef);
    }


    ngAfterContentInit():void{

    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {

    }

    get isAddButtonVisible():boolean{
      let isVisible:boolean = true;
      if(this.allowAdd === false){
        return false;
      }

      if(this.checkOrganizationLevel()===false){
        return false;
      }

      if(this.getVisiblityDefaultByLicenseType()===false){
        return false;
      }

      if(this.gridView.useRoute===false){
         isVisible = this.addButtonClickEvent.observers.length>0;
      }

      if(isVisible===true){
        if(this.canAddButtonBeVisible){
          isVisible = this.canAddButtonBeVisible(this.cellInfo);
        }
      }
      return isVisible;
    }


    get isEditButtonVisible():boolean{
      let isVisible:boolean = true;
      if(this.allowEdit === false){
        return false;
      }

      if(this.checkOrganizationLevel()===false){
        return false;
      }

      if(this.gridView.useRoute===false){
         isVisible = this.editButtonClickEvent.observers.length>0;
      }

      if(isVisible===true){
        if(this.canEditButtonBeVisible){
          isVisible = this.canEditButtonBeVisible(this.cellInfo);
        }
      }
      return isVisible;

    }


    get isDeleteButtonVisible():boolean{
      let isVisible:boolean = true;
      if(this.allowDelete === false){
        return false;
      }

      if(this.checkOrganizationLevel()===false){
        return false;
      }

      if(this.getVisiblityDefaultByLicenseType()===false){
        return false;
      }

      if(isVisible===true){
        if(this.canDeleteButtonBeVisible){
          isVisible = this.canDeleteButtonBeVisible(this.cellInfo);
        }
      }
      return isVisible;

    }

    isCellButtonVisible(button:GridCellButtonComponent):boolean{
      let isVisible:boolean = true;
      if(button.canBeVisible){
        isVisible = button.canBeVisible(this.cellInfo);
      }
      return isVisible;

    }

    addButtonClick():void{
      if(this.gridView.getSelectedRowKeys().length>1 || this.isAddButtonVisible === false){
        return;
      }

      if(this.allowAdd === true && this.cellInfo){
         this.gridView.selectRowsByIndexes(this.cellInfo.rowIndex);

         if (this.onAddButtonClick(this.cellInfo)){
           return;
         }
         this.gridView.newItem();
      }
    }


    editButtonClick():void{
      if(this.gridView.getSelectedRowKeys().length>1 || this.isEditButtonVisible === false){
        return;
      }

      if(this.allowEdit === true && this.cellInfo){
         this.gridView.selectRowsByIndexes(this.cellInfo.rowIndex);

         if (this.onEditButtonClick(this.cellInfo)){
           return;
         }
         this.gridView.editItem();
      }
    }


    deleteButtonClick():void{
      if(this.gridView.getSelectedRowKeys().length>1 || this.isDeleteButtonVisible === false){
        return;
      }

      if(this.allowDelete === true && this.cellInfo){
         this.gridView.selectRowsByIndexes(this.cellInfo.rowIndex);

         if (this.onDeleteButtonClick(this.cellInfo)){
           return;
         }
         this.gridView.deleteItem();
      }
    }

    cellButtonClick(button:GridCellButtonComponent):void{
      if(this.gridView.getSelectedRowKeys().length>1 ){
        return;
      }

      button.onClick(this.cellInfo);
    }

    getClassName(): string {
      let className:string = '';
      if(this.gridView.getSelectedRowKeys().length>1 ){
        className = 'isDisabled';
      }
      return className;
    }

    private getVisiblityDefaultByLicenseType():boolean{
      return true;
    }

    private checkOrganizationLevel():boolean{
       let model:Model;
       if(this.cellInfo.data.hasOwnProperty('Entity')){
         model = <Model>this.cellInfo.data.Entity;
       }else{
        model = <Model>this.cellInfo.data;
       }
       return true;
    }

    onAddButtonClick(cellInfo: ICellInfo) {
      let handled : boolean = false;
      if (this.addButtonClickEvent.observers.length>0){
        handled= true;
        this.addButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

    onEditButtonClick(cellInfo: ICellInfo) {
      let handled : boolean = false;
      if (this.editButtonClickEvent.observers.length>0){
        handled= true;
        this.editButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

    onDeleteButtonClick(cellInfo: ICellInfo) {
      let handled : boolean = false;
      if (this.deleteButtonClickEvent.observers.length>0){
        handled= true;
        this.deleteButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

}
