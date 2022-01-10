import {  Component,  Input, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { IReturnValue } from "src/app/core/component-model/ireturn-value";
import { BaseComponent } from "src/app/core/components/base-component";

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
@ComponentName(DeleteConfirmComponent,"DeleteConfirmComponent")
export class DeleteConfirmComponent extends BaseComponent implements OnInit,OnDestroy,IReturnValue<boolean>{
 
   public returnValue: boolean;
   private okButton:any;

   @Input()
   public confirmationText: string;

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
     super.ngAfterViewInit();
     setTimeout(()=>this.okButton.focus(),0);

  }

   ok(): void {
      this.returnValue = true;
      this.panelInstanceRef.close();
   }

   cancel(){
      if (this.panelInstanceRef){
         this.panelInstanceRef.close();
      }
   }
}
