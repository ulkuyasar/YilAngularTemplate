import { AfterViewInit, Component, ComponentFactory, ComponentRef, Input, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { Virtual } from "../decorators/virtual";
import { PageComponent } from "./page-component";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class ListComponent extends PageComponent implements OnInit, OnDestroy, AfterViewInit{

    @ViewChildren(GridViewComponent)
    gridViews: QueryList<GridViewComponent>; 

    @ViewChildren(GridTreeComponent)
    gridTrees: QueryList<GridTreeComponent>; 
    
    @Input('autoBind')
    autoBind: boolean;       

    autoRefresh: boolean;

    constructor(public viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
        this.autoBind = true;
        this.autoRefresh = true;         
    }


    ngOnInit() {
        super.ngOnInit();
        if (this.autoBind){
            this.dataBind();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.gridViews){
            this.gridViews.forEach(grid=>{
                grid.parentListComponent = this;
            });
        }

        if (this.gridTrees){
            this.gridTrees.forEach(tree=>{
                tree.parentListComponent = this;
            });
        } 
    }

    @Virtual()
    dataBind(options?:Partial<IDataSourceOptions>,load:boolean=false):void{

    }

    @Virtual()
    deleteItem(id : any):void{

    }

}
