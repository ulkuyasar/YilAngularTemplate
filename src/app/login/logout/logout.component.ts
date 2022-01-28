import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ElementRef, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import {  DxPopupComponent } from "devextreme-angular";
import { PanelViewType } from "src/app/core/component-model/panel-view-type.enum";
import { PanelComponent } from "src/app/core/components/panel-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import $ from 'jquery';
import { IReturnValue } from "src/app/core/component-model/ireturn-value";
import { BaseComponent } from "src/app/core/components/base-component";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
@ComponentName(LogoutComponent,"LogoutComponent")
export class LogoutComponent extends BaseComponent implements OnInit,OnDestroy,IReturnValue<boolean>{

   public returnValue: boolean;
   okButton:any;

   @Input()
   public logoutationText: string;

   constructor(viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         this.returnValue = false;
   }

   ngOnInit(): void {
       super.ngOnInit();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  getInstance(e){
     this.okButton = e.component;
  }

  ngAfterViewInit(){

     setTimeout(()=>this.okButton.focus(),0);

  }

   ok(): void {
      this.returnValue = true;
      if (this.panelInstanceRef){
        this.panelInstanceRef.close();
      }
   }

   cancel(){
      if (this.panelInstanceRef){
         this.panelInstanceRef.close();
      }
   }
}
