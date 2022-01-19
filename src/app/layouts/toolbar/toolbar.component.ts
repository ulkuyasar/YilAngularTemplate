import { Component,   HostListener, Input, OnDestroy, OnInit,  ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";

export enum KEY_CODE{
  CONSOLE=118
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(ToolbarComponent,"ToolbarComponent")
export class ToolbarComponent extends BaseComponent implements OnInit,OnDestroy{
    
  docUrl:any;
  urlPathData:string;
  urlPath:string;
  urlTrimmed:string;
  docLicenceType:string;

  public collapseToolbarState:boolean=false;

  @HostListener('window:keyup',['$event'])
  keyEvent(event:KeyboardEvent){
    if(event.keyCode===KEY_CODE.CONSOLE){
      this.collapseToolbar();
    }
  }


  constructor(viewContainerRef:ViewContainerRef, private _authenticationService:AuthenticationService,route:ActivatedRoute,router:Router ){
    super(viewContainerRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadLicence();
  }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  collapseToolbar(): void {
    super.ngAfterViewInit();

    this.collapseToolbarState = !this.collapseToolbarState;
    this.urlPathData = this.router.url.slice(0,10);
    this.docUrl = 'asset/documents'+this.urlPathData+'/'+this.docLicenceType+'.md';
  }

  loadLicence():void{
    this.docLicenceType="Inter";
  }

}