import {  Component,  Input, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { PanelComponent } from "src/app/core/components/panel-component";

@Component({
  selector: 'app-embedded-router-outlet-panel',
  templateUrl: './embedded-router-outlet-panel.component.html',
  styleUrls: ['./embedded-router-outlet-panel.component.css']
})
@ComponentName(EmbeddedRouterOutletPanelComponent,"EmbeddedRouterOutletPanelComponent")
export class EmbeddedRouterOutletPanelComponent extends PanelComponent implements OnInit,OnDestroy{

   routerDivID:string;

   constructor(viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         let componentName = this.componentHierarchyService.getRouteComponentName(this.activatedRoute);
         this.routerDivID = `Div_${componentName}_Router_Outlet`
   }

   ngOnInit(): void {
       super.ngOnInit();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

}
