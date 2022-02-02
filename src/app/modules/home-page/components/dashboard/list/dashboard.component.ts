import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ElementRef, ViewContainerRef, ViewEncapsulation, AfterViewInit } from "@angular/core";
import {  DxPopupComponent } from "devextreme-angular";
import { PanelViewType } from "src/app/core/component-model/panel-view-type.enum";
import { PanelComponent } from "src/app/core/components/panel-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import $ from 'jquery';
import { IReturnValue } from "src/app/core/component-model/ireturn-value";
import { BaseComponent } from "src/app/core/components/base-component";
import { FilterPanelComponent } from "src/app/layouts/filter-panel/filter-panel.component";
import { GridViewComponent } from "src/app/layouts/grid-view/grid-view.component";
import { FwAccessTopologyService } from "src/app/services/fw-access/fw-access-topology.service";
import { IButtonOptions } from "src/app/devextreme/interfaces/button/ibutton-options";
import { ListComponent } from "src/app/core/components/list-component";
import { IButtonClickEventArgs } from "src/app/devextreme/interfaces/button/ibutton-click-event-args";
import { FWAccessTopologyFilterModel } from "src/app/models/fw-access/filter-model/fwaccesstopologyfiltermodel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@ComponentName(DashboardComponent,"DashboardComponent")
export class DashboardComponent extends ListComponent implements OnInit,OnDestroy,AfterViewInit{


   constructor(viewContainerRef:ViewContainerRef){
         super(viewContainerRef);

         this.injectServices();
         this.setEditorOptions();
   }

   private setEditorOptions():void{

   }

  private injectServices():void{
    //this._fwaccessTopologyService = this.Injector.get<FwAccessTopologyService>(FwAccessTopologyService);
  }



   ngOnInit(): void {
       super.ngOnInit();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  ngAfterViewInit(){
     super.ngAfterViewInit();
  }

}
