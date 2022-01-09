import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";


@Component({
  selector: 'app-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.css']
  
})
@ComponentName(GridFooterComponent,"GridFooterComponent")
export class GridFooterComponent extends BaseComponent implements OnInit,OnDestroy{
    
    gridView: IGridView;
    constructor(viewContainerRef:ViewContainerRef){
      super(viewContainerRef);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}