import { Component,  Input,  OnDestroy, OnInit, Output, SimpleChanges, ViewContainerRef } from "@angular/core";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import { ICellInfo } from "src/app/devextreme/interfaces/grid/icell-info";
import { EventEmitter } from "stream";


@Component({
  selector: 'app-grid-cell-button',
  templateUrl: './grid-cell-button.component.html',
  styleUrls: ['./grid-cell-button.component.css']
  
})
@ComponentName(GridCellButtonComponent,"GridCellButtonsComponent")
export class GridCellButtonComponent extends BaseComponent implements OnInit,OnDestroy{
    
    @Input()
    canBeVisible: (cellInfo:ICellInfo) => boolean;

    @Input()
    name: string;

    @Input()
    icon: string;

    @Input()
    tooltip: string;

   

    @Output('onClick')
    clickEvent = new EventEmitter<ICellInfo>();

    cellInfo:ICellInfo;

    constructor(viewContainerRef:ViewContainerRef){
      super(viewContainerRef);
    }   

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    onClick(cellInfo: ICellInfo): boolean {
      let handled : boolean = false;
      if (this.clickEvent.observers.length>0){
        handled= true;
        this.clickEvent.emit(cellInfo);
      }
      return handled;
    }

}