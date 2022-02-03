import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,ElementRef, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { PageComponent } from "src/app/core/components/page-component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
@ComponentName(MainComponent,"MainComponent")
export class MainComponent extends PageComponent implements OnInit,OnDestroy{

   constructor(viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         this.createPanels = false;
   }

   ngOnInit(): void {
       super.ngOnInit();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

}
