import {  Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { FWAccessNodeViewModel } from "src/app/models/fw-access/view-model/fw-access-node-view-model";
import { ModelComponent } from "src/app/core/components/model-component";
import { ModelFormComponent } from "src/app/layouts/model-form/model-form.component";
import { EnumService } from "src/app/services/core/enum.service";
import { ISelectBoxEditorOptions } from "src/app/devextreme/interfaces/select-box/iselect-box-editor-options";
import { EnumModel } from "src/app/models/core/enum-model";
import { FwAccessTopologyService } from "src/app/services/fw-access/fw-access-topology.service";
import { Override } from "src/app/core/decorators/override";
import { ModelOperation } from "src/app/core/models/model-operation.enum";

@Component({
  selector: 'app-fw-access-topology-node-model',
  templateUrl: './fw-access-topology-node-model.component.html',
  styleUrls: ['./fw-access-topology-node-model.component.css']
})
@ComponentName(FwAccessTopologyNodeModelComponent,"FwAccessTopologyNodeModelComponent")
export class FwAccessTopologyNodeModelComponent extends ModelComponent<FWAccessNodeViewModel> implements OnInit,OnDestroy,AfterViewInit{


  @ViewChild('fwaccesstopologynode',{static:true}) fwaccesstopologynode:ModelFormComponent;
  private _enumService:EnumService;
  devicetypeselectboxeditoroptions:ISelectBoxEditorOptions<EnumModel>;

   constructor(fwaccessTopologyService:FwAccessTopologyService ,viewContainerRef:ViewContainerRef){
         super(fwaccessTopologyService,viewContainerRef);
         this.injectService();
         this.setEditorOptions();
         this.setPopupOptions();

   }

   private injectService():void{
     this._enumService = this.Injector.get<EnumService>(EnumService);
   }

  private setPopupOptions():void{
    this.popupOptions.MaxWidth="70%";
    this.popupOptions.Height="auto";

    this.popupOptions.MaxHeight = function(){
      return window.innerHeight - 40;
    };
    this.popupOptions.Position = {
      my:'top',at:'top',of:'main',offset:'0 20'
    };

  }

  private setEditorOptions():void{

    this.devicetypeselectboxeditoroptions = {
      valueExpr:'Value',
      displayExpr:'Description',
      showClearButton:true,
      searchEnabled:true,
      dataSource:this._enumService.getDeviceTypeEnumforFwAccessNode()
    }
  }

  @Override()
  public getPopupTitle(model: FWAccessNodeViewModel, operations: ModelOperation): string {
      switch(operations){
        case ModelOperation.New:
          return this.localization.getMessage("fw.access.topology.node.add.title");
        case ModelOperation.Edit:
          return this.localization.getMessage("fw.access.topology.node.edit.title");
        default:
          break;
      }
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
