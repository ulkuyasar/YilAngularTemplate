import { EventEmitter, Input, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { IButtonClickEventArgs } from "src/app/devextreme/interfaces/button/ibutton-click-event-args";
import { IButtonComponent } from "src/app/devextreme/interfaces/button/ibutton-component";
import { IButtonInitilizedArgs } from "src/app/devextreme/interfaces/button/ibutton-initialized-args";
import { IButtonOptions } from "src/app/devextreme/interfaces/button/ibutton-options";
import { Notify } from "../decorators/notify";
import { Override } from "../decorators/override";
import { Virtual } from "../decorators/virtual";
import { FormItemDirective } from "./form-Item.directive";

export abstract class ButtonDirective extends FormItemDirective implements OnInit,OnDestroy{
    
    @Input('buttonCssClass')
    @Notify()
    public buttonCssClass:string;
    
    @Input('buttonText')
    @Notify()
    public buttonText:string;
    
    @Input('buttonHint')
    @Notify()
    public buttonHint:string;
    
    @Input('buttonIcon')
    @Notify()
    public buttonIcon:string;

    @Input('buttonDisabled')
    @Notify()
    public buttonDisabled:boolean;

    @Input('onButtonClick')
    public buttonClickEvent=new EventEmitter<IButtonClickEventArgs>();

    private _buttonOptions:IButtonOptions;
    private _buttonInstance:IButtonComponent;

    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
        this.setButtonOptions();

    }

    public get buttonOptions():IButtonOptions{
        return this._buttonOptions;
    }

    public get buttonInstance():IButtonComponent{
        return this._buttonInstance;
    }

    @Override()
    protected initializeOptions(): void{
        super.initializeOptions();
        this.buttonOptions.visible = this.visible;
        this.buttonOptions.disabled = this.buttonDisabled;
        this.buttonOptions.text = this.buttonText;
        this.buttonOptions.hint = this.buttonHint;
        this.buttonOptions.icon = this.buttonIcon;

        this.hostItem.itemType = "button";
        this.hostItem.buttonOptions = this._buttonOptions;
    }

    @Override()
    protected updateChanges(changes:SimpleChanges):void{
        super.updateChanges(changes);
        if(this.buttonInstance){
            if(changes['visible']){
                this.buttonInstance.option("visible",this.visible)
            }

            if(changes['buttonText']){
                this.buttonInstance.option("text",this.buttonText)
            }

            if(changes['buttonHint']){
                this.buttonInstance.option("hint",this.buttonHint)
            }

            if(changes['buttonIcon']){
                this.buttonInstance.option("Icon",this.buttonIcon)
            }

            if(changes['buttonDisabled']){
                this.buttonInstance.option("disabled",this.buttonDisabled)
            }

            if(changes['buttonCssClass']){
                this.buttonInstance.option("class",this.buttonCssClass)
            }
        }
    }

    @Override()
    protected setButtonOptions():void{
        this._buttonOptions = {
            onInitilized:(args:IButtonInitilizedArgs) => this.buttonInitialized(args),
            onClick:(args:IButtonClickEventArgs) => this.buttonClick(args),
        };
    }

    private buttonInitialized(args:IButtonInitilizedArgs):void{
        this._buttonInstance=args.component;
    }

    @Override()
    protected buttonClick(args:IButtonClickEventArgs):void{
        this.onButtonClick(args);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected onButtonClick(args:IButtonClickEventArgs):boolean{
        let handled:boolean=false;
        if(this.buttonClickEvent.observers.length>0){
            handled=true;
            this.buttonClickEvent.emit(args);
        }
        return handled;
    }

}