import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { DxLoadPanelComponent } from "devextreme-angular";
import { BaseComponent } from "src/app/core/components/base-components";
import { ComponentName } from "src/app/core/decorators/component-name";
import { ILoadingPanelOptions } from "../iloading-panel.options";


@Component({
  selector: 'app-loading-panel',
  templateUrl: './loading-panel.component.html',
  styleUrls: ['./loading-panel.component.scss']
})
@ComponentName(LoadingPanelComponent,"LoadingPanelComponent")
export class LoadingPanelComponent extends BaseComponent implements OnInit,OnDestroy, AfterViewInit{
 
   @ViewChild(DxLoadPanelComponent, { static: true })
   loadPanel!: DxLoadPanelComponent; 

   public active:boolean = false;
   public position:any;
   public message:string = "";
   private stopped:boolean= false;
   private defaultMessage:string = "";



  constructor(private loadingPanelService:LoadingPanelService, viewContainerRef:ViewContainerRef) {
     super(viewContainerRef);
  }

   ngOnInit(): void {
      super.ngOnInit();
      this.defaultMessage = this.loadPanel.message;
      this.loadingPanelService.instance.subcribe((options:ILoadingPanelOptions) =>{
         this.updateOptions(options);
      });
   }
   updateOptions(options: ILoadingPanelOptions) {
      if (options.elementID && options.elementID!=null){
         let targetElement:HTMLElement = document.getElementById(options.elementID) as HTMLElement;
         let offset:number = this.GetYOffset(targetElement);

         if (offset&& offset>0){
            this.position = {my:'top',at:'top', of:'#'+options.elementID+"",offset:'0 '+offset};
         }else{
            this.position = {my:'center',at:'center',of:'#'+options.elementID+"",offset:'0 0'};

         }
      }else{
         this.position = {my:'center',at:'center',of:window,offset:'0 0'};
      }

      if(options.message && options.message !="" && options.message !=null){
         this.loadPanel.message = options.message;
      }else{
         this.loadPanel.message = this.defaultMessage;
      }

      this.stopped = options.active ? false:true;
      let showDelay = options.showDelay;
      if (showDelay){
         if(options.active){
            setTimeout(()=>{
               if(!this.stopped && options.active && options.showDelay){
                  this.active = options.active;
               }},50);
            
         }
      }
      else{
         if(options.active===true){
            setTimeout(()=>{
               if(!this.stopped && options.active){
                  this.active = options.active;
               }},10);
            
         }else{
            this.active = options.active;
         }
      }
   }

   private GetYOffset(targetElement:HTMLElement):number | any{
      if(!targetElement){
         return null;
      }
      let element :any;
      if(targetElement.offsetHeight && targetElement.offsetHeight>0){
         element = targetElement;
      }else{
         if(targetElement.firstElementChild && (<any>targetElement.firstElementChild).offsetHeight>0){
            element = targetElement.firstElementChild;
         }
      }

      if(!element){
         return null;
      }

      let totalHeight :number = element.offsetTop + element.offsetHeight;
      if (totalHeight>window.innerHeight){
         return (element.offsetHeight-window.innerHeight)/2;
      }else{
         return null;
      }
   }
 
   ngOnDestroy(): void {
      super.ngOnDestroy();
   }

   ngAfterViewInit(){
      super.ngAfterViewInit();
      this.defaultMessage = this.loadPanel.message;
   }
}