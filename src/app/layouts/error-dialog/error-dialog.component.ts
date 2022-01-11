import { Component, Input, OnDestroy, OnInit, ViewContainerRef, AfterViewInit } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { BaseComponent } from "src/app/core/components/base-component";
import { StringChain } from "lodash";
import { errorImage400, errorImage401, errorImage403, errorImage404, errorImage500, errorImage503, errorImageOAuth } from "./error-dialog-images";

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
@ComponentName(ErrorDialogComponent,"ErrorDialogComponent")
export class ErrorDialogComponent extends BaseComponent implements OnInit,OnDestroy,AfterViewInit{
 
   private _errorMessage: ErrorMessage;
   public message:string;
   public iconSource:string;
   public buttonText:string;

   private okButton:any;

   constructor(viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
   }

   get errorMessage():ErrorMessage{
      return this._errorMessage;
   }

   set errorMessage(errorMessage: ErrorMessage){
      this._errorMessage = errorMessage;
      this.message = errorMessage.message;
      this.setImage(errorMessage);
   }

   private setImage(errorMessage: ErrorMessage):void{
      if(errorMessage.source === ErrorSource.OAuth){
         this.iconSource = errorImageOAuth;
      }else{
         switch(errorMessage.httpStatus){
            case 400:
               this.iconSource = errorImage400;
               break;
            case 401:
               this.iconSource = errorImage401;
               break;

            case 403:
               this.iconSource = errorImage403;
               break;

            case 404:
               this.iconSource = errorImage404;
               break;

            case 500:
               this.iconSource = errorImage500;
               break;

            case 503:
               this.iconSource = errorImage503;
               break;

            default:
               this.iconSource = null;
               break;

         }
      }
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

   okButtonClick(): void {
      if (this.panelInstanceRef){
         this.panelInstanceRef.close();
      }
   }
}
