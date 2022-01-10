import {  Component, OnDestroy, OnInit,ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { BaseComponent } from "src/app/core/components/base-component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(ContentComponent,"ContentComponent")
export class ContentComponent extends BaseComponent implements OnInit,OnDestroy{
 
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
