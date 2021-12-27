import { AfterViewInit, Component, ComponentFactory, ComponentRef, Input, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { Virtual } from "../decorators/virtual";
import { Model } from "../models/model";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class ModelListComponent<T extends Model,TKey=number> extends ListComponent implements OnInit, OnDestroy, AfterViewInit, IReturnValue<T|Array<T>>{

    returnValue: T|Array<T>;

    protected _modelService:IModelService<T,TKey>;

    constructor(modelService:IModelService<T,TKey>, viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
        this._modelService = modelService;

        this.dataContext.currentChangedEvent.subscribe((currentValue:any)=>{
            this._returnValue = this.dataContext.curent;
        })       
    }


    ngOnInit() {
        super.ngOnInit();
        
    }

    37-45 arası yazılmalı
    ngOnDestroy() {
        super.ngOnDestroy();
    }


    @Virtual()
    protected createDataSourceOptions():DataSourceOptions{
        return new DataSourceOptions({key:'Id'});
    }

    @Override()
    dataBind(options?:Partial<IDataSourceOptions>,load:boolean = false){
        setTimeout(()=> {
            this._modelService.getList().subscribe(data => {
                this.dataContext.dataSource = data;
            });
                
            
        },5);
    }

    @Override()
    deleteItem(id:TKey){
        let popupService = this.Injector.get<PopupService>(PopupService);
        let popupOptions : PopupOptions = new PopupOptions({
            ShowTitle:false
        });

        let afterDeleteConfirmationCreate = (componentInstance:DeleteConfirmComponent)=>{
            componentInstance.confirmationText = this.localization.getMessage('delete.confirmation.txt');
        }

      
        let popupRef : PopupRef<DeleteConfirmComponent> = popupService.openGlobalPrepoptheComponentType(DeleteConfirmComponent,popupOptions,afterDeleteConfirmationCreate);
        popupRef.afterClosed().subscribe((returnValue:boolean) =>{
            if(returnValue===true){
                this.loadingPanel.start();
                this._modelService.deleteByID(id).sucscribe(
                    (model) => {
                        this.loadingPanel.stop();
                        this.dataBind();
                        this.event.toastSuccess(this.localization.getMessage('model.deleted'));
                    },
                    (error) =>{
                        this.loadingPanel.stop();
                        this.event.toastError(this.localization.getMessage('model.deleted.error'));
                    }
                )
            }
        })


    }
}
