import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ElementRef, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import {  DxPopupComponent } from "devextreme-angular";
import { PanelViewType } from "src/app/core/component-model/panel-view-type.enum";
import { PanelComponent } from "src/app/core/components/panel-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import $ from 'jquery';

@Component({
  selector: 'app-popup-panel',
  templateUrl: './popup-panel.component.html',
  styleUrls: ['./popup-panel.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(PopupPanelComponent,"PopupPanelComponent")
export class PopupPanelComponent extends PanelComponent implements OnInit,OnDestroy{

   @ViewChild(DxPopupComponent, { static: true })
   popup!: DxPopupComponent;

   @ViewChild("componentContainer", { read:ViewContainerRef, static: true })
   componentContainer!: ViewContainerRef;

   Animation?:{
      duration:0
   }

   @Input()
   height?:number | string | Function;

   @Input()
   maxHeight?:number | string | Function;

   @Input()
   minHeight?:number | string | Function;

   @Input()
   width?:number | string | Function;

   @Input()
   maxWidth?:number | string | Function;

   @Input()
   minWidth?:number | string | Function;


   @Input()
   position:any;

   @Input()
   ngClass:any;

   @Input()
   showTitle:boolean =true;

   @Input()
   fullScreen:boolean =false;

   @Input()
   resizeEnabled:boolean =false;

   @Input()
   shading:boolean =true;

   @Input()
   shadingColor:string ="";

   @Input()
   showCloseButton:boolean =true;

   @Input()
   closeOnOutsideClick:boolean =false;

   @Input()
   dragEnabled:boolean =true;

   @Input()
   containerElement:string ="";

   @Input()
   elementAttr:object ={};



   @Output('onShowing')
   showingEvent : EventEmitter<any> = new EventEmitter<any>();

   @Output('onShown')
   shownEvent : EventEmitter<any> = new EventEmitter<any>();

   @Output('onHiding')
   hidingEvent : EventEmitter<any> = new EventEmitter<any>();

   @Output('onHidden')
   hiddenEvent : EventEmitter<any> = new EventEmitter<any>();

   closeEvent:EventEmitter<string> = new EventEmitter<string>();

   containerDivID :string;
   isOpened:boolean;
   initalizeContentTemplate:boolean;


   constructor(private element:ElementRef,viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         this.visible = false;
         this.containerDivID = 'Container_Div_'+this.componentID;
         this.isOpened = false;
         this.initalizeContentTemplate=false;
   }

   ngOnInit(): void {
       super.ngOnInit();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  onShowing(data:any): boolean {
   let handled:boolean = false;
   if(this.showingEvent.observers.length>0){
      handled = true,
      this.showingEvent.emit(data);
   }
   return handled;
  }

  onShown(data:any): boolean {
   let handled:boolean = false;
   if(this.shownEvent.observers.length>0){
      handled = true,
      this.shownEvent.emit(data);
   }
   return handled;
  }

  onHiding(data:any): boolean {
   let handled:boolean = false;
   if(this.hidingEvent.observers.length>0){
      handled = true,
      this.hidingEvent.emit(data);
   }
   return handled;
  }


  onHidden(data:any): boolean {
   let handled:boolean = false;
   if(this.hiddenEvent.observers.length>0){
      handled = true,
      this.hiddenEvent.emit(data);
   }
   return handled;
  }

  onClose(data:any): boolean {
   let handled:boolean = false;
   if(this.closeEvent.observers.length>0){
      handled = true,
      this.closeEvent.emit(data);
   }
   return handled;
  }

  showing(args:any) {
   if(this.onShowing(args)){
    return;
   }
  }

  shown(args:any) {
     this.isOpened = true;
     this.popup.instance.repaint();
     this.onShown(args);
  }

  hiding(args:any) {
   if(this.onHiding(args)){
    return;
   }
  }

  hidden(args:any) {
   this.isOpened = false;

   if (this.panelViewType===PanelViewType.Router){
      let componentName = this.componentHierarchyService.getRouteComponentName(this.activatedRoute);
      $(`#Div_${componentName}_Router_Outlet`).css('display','none');
      $(`#Div_${componentName}_Router_Outlet`).appendTo($(this.element.nativeElement));
   }
   else{
      $('#'+this.containerDivID).css('display','none');
      $('#'+this.containerDivID).appendTo(this.element.nativeElement);
   }

   this.initalizeContentTemplate = false;
   this.popup.instance.repaint();
   this.onHidden(args);
   this.onClose(this.componentID);
  }

  open() {
      this.initilize();
      this.popup.instance.show();
   }

   close() {
      this.popup.instance.hide();
   }

   private initilize(){
      this.setContentTemplate();
      this.detectChanges();
   }

   private setContentTemplate():void{
      this.popup.contentTemplate = (element:any) =>{
         this.initalizeContentTemplate = true;
         if(this.panelViewType === PanelViewType.Router ){
            this.moveDivRouterOutlet(element);
         }else{
            $('#'+this.containerDivID).appendTo(element);
            $('#'+this.containerDivID).css('display','');
         }
      }
   }

   private moveDivRouterOutlet(element:any):void{
      let componentName = this.componentHierarchyService.getRouteComponentName(this.activatedRoute);
      if ( $(`#Div_${componentName}_Router_Outlet`).length >0){
         $('#'+this.containerDivID).appendTo(element);
         $('#'+this.containerDivID).css('display','');
      }
   }
}
