import {  Component, OnDestroy, OnInit, ViewContainerRef, AfterViewInit } from "@angular/core";;
import { ComponentName } from "src/app/core/decorators/component-name";
import { PageComponent } from "src/app/core/components/page-component";

@Component({
  selector: 'app-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.css']
})
@ComponentName(RouteNotFoundComponent,"RouteNotFoundComponent")
export class RouteNotFoundComponent extends PageComponent implements OnInit,OnDestroy,AfterViewInit{

   constructor(viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
   }

   ngOnInit(): void {
       super.ngOnInit();
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
      super.ngAfterViewInit();
  }

}
