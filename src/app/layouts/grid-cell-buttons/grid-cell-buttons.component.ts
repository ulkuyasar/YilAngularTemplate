import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChange, SimpleChanges, ViewContainerRef } from "@angular/core";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import { ICellInfo } from "src/app/devextreme/interfaces/grid/icell-info";
import { GridCellButtonComponent } from "../grid-cell-button/grid-cell-button.component";


@Component({
  selector: 'app-grid-cell-buttons',
  templateUrl: './grid-cell-buttons.component.html',
  styleUrls: ['./grid-cell-buttons.component.css']

})
@ComponentName(GridCellButtonsComponent,"GridCellButtonsComponent")
export class GridCellButtonsComponent extends BaseComponent implements OnInit,OnDestroy,AfterContentInit,OnChanges{

    @ContentChildren(GridCellButtonComponent)
    cellButtons:QueryList<GridCellButtonComponent>;


    @Input()
    allowAdd: boolean = false;

    @Input()
    allowEdit: boolean = true;

    @Input()
    allowDelete: boolean = true;

    @Input()
    allowCheck: boolean = true;

    @Input()
    addIcon: string = 'icon icon-plus';

    @Input()
    editIcon: string = 'icon icon-pencil';

    @Input()
    deleteIcon: string = 'icon icon-close';

    @Input()
    checkIcon: string = 'icon icon-close';

    @Input()
    addToolTip: string;

    @Input()
    editToolTip: string;

    @Input()
    deleteToolTip: string;

    @Input()
    checkToolTip: string;

    @Input()
    width: number | string = 60;

    @Input()
    canAddButtonBeVisible: (cellInfo: ICellInfo) => boolean;

    @Input()
    canEditButtonBeVisible: (cellInfo: ICellInfo) => boolean;

    @Input()
    canDeleteButtonBeVisible: (cellInfo: ICellInfo) => boolean;

    @Input()
    canCheckButtonBeVisible: (cellInfo: ICellInfo) => boolean;

    @Input()
    overrideActionVisibility: boolean = false;

    @Output('onAddButtonClick')
    addButtonClickEvent = new EventEmitter<ICellInfo>();

    @Output('onEditButtonClick')
    editButtonClickEvent = new EventEmitter<ICellInfo>();

    @Output('onDeleteButtonClick')
    deleteButtonClickEvent = new EventEmitter<ICellInfo>();

    @Output('onCheckButtonClick')
    checkButtonClickEvent = new EventEmitter<ICellInfo>();



    @Output('onCellButtonsPreparing')
    cellButtonsPreparingEvent = new EventEmitter<any>();

    @Output('onPropertyChanged')
    propertyChangedEvent = new EventEmitter<SimpleChanges>();

    private _defaultWidth: number | string = 60;

    constructor(viewContainerRef:ViewContainerRef){
      super(viewContainerRef);
      this.width = this._defaultWidth;
    }

    private get hasCellButtons():boolean{
      if (this.cellButtons){
        return this.cellButtons.length>0
      }
      return false;
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

    ngOnChanges(changes: SimpleChanges): void {
        this.onPropertyChanged(changes);
    }

    public isDefaultWidth():boolean{
      return this.width === this._defaultWidth;
    }

    onAddButtonClick(cellInfo: ICellInfo){
      let handled : boolean = false;
      if (this.addButtonClickEvent.observers.length>0){
        handled= true;
        this.addButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

    onEditButtonClick(cellInfo: ICellInfo){
      let handled : boolean = false;
      if (this.editButtonClickEvent.observers.length>0){
        handled= true;
        this.editButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

    onDeleteButtonClick(cellInfo: ICellInfo){
      let handled : boolean = false;
      if (this.deleteButtonClickEvent.observers.length>0){
        handled= true;
        this.deleteButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

    onCheckButtonClick(cellInfo: ICellInfo){
      let handled : boolean = false;
      if (this.checkButtonClickEvent.observers.length>0){
        handled= true;
        this.checkButtonClickEvent.emit(cellInfo);
      }
      return handled;
    }

    onCellButtonsPreparing(data: any){
      let handled : boolean = false;
      if (this.cellButtonsPreparingEvent.observers.length>0){
        handled= true;
        this.cellButtonsPreparingEvent.emit(data);
      }
      return handled;
    }

    onPropertyChanged(data: SimpleChanges){
      let handled : boolean = false;
      if (this.propertyChangedEvent.observers.length>0){
        handled= true;
        this.propertyChangedEvent.emit(data);
      }
      return handled;
    }
}
