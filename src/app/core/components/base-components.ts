import { AfterViewInit, OnDestroy, OnInit, ViewContainerRef,Injector,ElementRef,ComponentFactoryResolver,ChangeDetectorRef,EventEmitter,Type,InjectionToken, Input } from "@angular/core";
import { ComponentHierarchyInfo } from "src/app/layouts/component-hierarchy/component-hierarchy-info";
import { DataContext } from "../data/data-context";

export abstract class BaseComponent implements OnInit, OnDestroy, AfterViewInit{
    
    private __componentClassName() => string;


    @Input('id')
    Id:string;

    @Input('Name')
    Name:string;

    @Input('Visible')
    Visible:boolean;

    @Input('UseRoute')
    UseRoute:boolean;

    @Input('Title')
    private _title: string | Function; 

    @Input('dataContext')
    private _dataContext: DataContext;

    private _isDestroyed: boolean = false;

    private _componentID: string;
    private _hierarchyInfo: ComponentHierarchyInfo;


}