import { EventEmitter } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import { isDataGroupItemArray } from "./idata-group-item";


export class DataContext{
    
    private _dataSource:any;
    private _position:number;
    private _selectedPositions:number[];

    dataSourceChangedEvent:EventEmitter<any>;
    currentChangedEvent:EventEmitter<any>;
    selectedItemsChangedEvent:EventEmitter<any>;


    constructor(){
        this._position=0;  // yasar
        this._selectedPositions =[]; //yasar

       this.dataSourceChangedEvent=new EventEmitter<any>();
       this.currentChangedEvent=new EventEmitter<any>();
       this.selectedItemsChangedEvent=new EventEmitter<any>();
    }

    get dataSource():any{
        return this._dataSource;
    }


    set dataSource(value:any){
        if (this._dataSource !== value){
            this._dataSource = value;
            this.onDataSourceChanged(this._dataSource);
        }
    }

    get position():number{
        return this.position;
    }

    set position(value:number){
        if (this._position !==value){
            this._position = value;
            this.onCurrentChanged(this.current);
        }
    }

    get selectedPositions():number[]{
        return this._selectedPositions;
    }

    set selectedPositions(value:number[]){
        this._selectedPositions = value;
        this.onSelectedItemChanged(this.selectedItems);
    }

    get items():Array<any>{
        if (this.dataSource instanceof Array){
            return <Array<any>>this.dataSource;
        } else if (this.dataSource instanceof DataSource){
            let datasource = <DataSource>(this.dataSource);
            return this.getActualItemsOfDataSource(datasource.items());
        }
        return null as any;
    }

    get current():any{
        if(this.dataSource instanceof Array){
            let currentItem :any = this.items[this.position];
            return this.getCurrentItem(currentItem);
        }
        else if (this.dataSource instanceof DataSource){
            let currentItem :any = this.items[this.position];
            return this.getCurrentItem(currentItem);
        }
        return this.dataSource;
    }

    get selectedItems(): any[]{

        if (this.items && this.selectedPositions){
            let selectedItemList : Array<any> = [];
            this.selectedPositions.forEach(selectedPosition => {
                selectedItemList.push(this.items[selectedPosition]);
            });
            return selectedItemList;
        }
        return null as any;
    }

    private getCurrentItem(item:any):any{
        if (item && item.hasOwnProperty('data')  && item.hasOwnProperty('level') ){
            return item.data;
        }
        return item;
    }

    private getActualItemsOfDataSource(items:any[]) :any[]{
        if (isDataGroupItemArray(items)){
            let subItems: any[] = [];
            items.forEach(subItem => {
                if (subItem.items instanceof Array){
                    subItem.items.forEach(item => {
                        subItems.push(item);
                    });
                }
            });
            return this.getActualItemsOfDataSource(subItems);
        }
        return items;
    }

    onDataSourceChanged(data:any){
        let handled:boolean = false;
        if (this.dataSourceChangedEvent.observers.length>0){
            handled = true;
            this.dataSourceChangedEvent.emit(data);
        }
        return handled;
    }

    onCurrentChanged(data:any){
        let handled:boolean = false;
        if (this.currentChangedEvent.observers.length>0){
            handled = true;
            this.currentChangedEvent.emit(data);
        }
        return handled;
    }


    onSelectedItemChanged(data:any){
        let handled:boolean = false;
        if (this.selectedItemsChangedEvent.observers.length>0){
            handled = true;
            this.selectedItemsChangedEvent.emit(data);
        }
        return handled;
    }



}