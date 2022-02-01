import { Input, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { DxiItemComponent } from "devextreme-angular/ui/nested/item-dxi";
import { isString } from "lodash";
import { ICalendarEditorOptions } from "src/app/devextreme/interfaces/calendar/ibutton-options";
import { IDateBoxComponent } from "src/app/devextreme/interfaces/date-box/idate-box-component";
import { IDateBoxEditorOptions } from "src/app/devextreme/interfaces/date-box/idate-box-editor-options";
import { IDateBoxInitilizedArgs } from "src/app/devextreme/interfaces/date-box/idate-box-initialized-args";
import { IDateBoxValueChangedArgs } from "src/app/devextreme/interfaces/date-box/idate-Box-value-changed-args";
import { format } from "src/app/devextreme/types";
import { Notify } from "../decorators/notify";
import { Override } from "../decorators/override";
import { InputBasedFieldDirective } from "./input-based-field-directive";


export abstract class DateBoxFieldDirective extends InputBasedFieldDirective<Date> implements OnInit,OnDestroy{

    @Input('displayFormat')
    @Notify()
    public displayFormat:format;

    @Input('showClearButton')
    @Notify()
    public showClearButton:boolean;

    @Input('min')
    @Notify()
    public min:string|number|Date;

    @Input('max')
    @Notify()
    public max:string|number|Date;

    @Input('type')
    @Notify()
    public type:string;

    @Input('calendarOptions')
    @Notify()
    public calendarOptions:ICalendarEditorOptions;


    private static _calendarOptionsDate:ICalendarEditorOptions= {
        zoomLevel:"month",
        maxZoomLevel:"month"
    };

    private static _calendarOptionsMonth:ICalendarEditorOptions= {
        zoomLevel:"year",
        maxZoomLevel:"year"
    };

    private static _calendarOptionsYear:ICalendarEditorOptions= {
        zoomLevel:"decade",
        maxZoomLevel:"decade"
    };

    public static get calendarOptionsDate():ICalendarEditorOptions{
        return DateBoxFieldDirective._calendarOptionsDate;
    }

    public static get calendarOptionsMonth():ICalendarEditorOptions{
        return DateBoxFieldDirective._calendarOptionsMonth;
    }

    public static get calendarOptionsYear():ICalendarEditorOptions{
        return DateBoxFieldDirective._calendarOptionsYear;
    }

    private _editorOptions:IDateBoxEditorOptions;
    private _editorInstance:IDateBoxComponent;

    constructor(hostItem: DxiItemComponent, viewContaiberRef: ViewContainerRef){
        super(hostItem,viewContaiberRef);
        Object.defineProperty(hostItem,"type",{ writable:true });
    }

    public get editorOptions():IDateBoxEditorOptions{
        return this._editorOptions;
    }

    public get editorInstance():IDateBoxComponent{
        return this._editorInstance;
    }

    @Override()
    protected setInitialValues(): void{
        super.setInitialValues();
        this.showClearButton=true;
        this.type="date";
    }

    @Override()
    protected initializeOptions(): void{
        super.initializeOptions();
        this.editorOptions.visible = this.visible;
        this.editorOptions.disabled = this.disabled;
        this.editorOptions.readonly = this.readOnly;
        this.editorOptions.placeholder = this.placeHolder;
        this.editorOptions.displayFormat = this.displayFormat;
        this.editorOptions.showClearButton = this.showClearButton;
        this.editorOptions.min = this.min;
        this.editorOptions.max = this.max;
        this.editorOptions.type = this.type;
        this.editorOptions.calendarOptions = this.calendarOptions;

        this.hostItem.itemType = "dxDateBox";
        this.hostItem.editorOptions = this.editorOptions;
    }

    @Override()
    protected setEditorOptions():void{
        super.setEditorOptions();
        this._editorOptions = {
            onInitilized:(args:IDateBoxInitilizedArgs) => this.editorInitialized(args),
            onValueChanged:(args:IDateBoxValueChangedArgs) => this.valueChanged(args),
        };
    }

    private editorInitialized(args:IDateBoxInitilizedArgs):void{
        this._editorInstance=args.component;
        this.configureDataType(this.editorInstance);
    }


    @Override()
    protected valueChanged(args:IDateBoxValueChangedArgs):void{
        super.valueChanged(args);
    }

    @Override()
    protected updateChanges(changes:SimpleChanges):void{
        super.updateChanges(changes);
        if(this.editorInstance){
            if (changes['disabled']){
                this.editorInstance.option("disabled", this.disabled);
            }

            if (changes['visible']){
                this.editorInstance.option("visible", this.visible);
            }

            if (changes['readOnly']){
                this.editorInstance.option("readOnly", this.readOnly);
            }

            if (changes['value']){
                this.editorInstance.option("value", this.value);
            }


            if (changes['placeHolder']){
                this.editorInstance.option("placeHolder", this.placeHolder);
            }

            if (changes['displayFormat']){
                this.editorInstance.option("displayFormat", this.displayFormat);
            }

            if (changes['showClearButton']){
                this.editorInstance.option("showClearButton", this.showClearButton);
            }

            if (changes['min']){
                this.editorInstance.option("min", this.min);
            }

            if (changes['max']){
                this.editorInstance.option("max", this.max);
            }

            if (changes['calendarOptions']){
                this.editorInstance.option("calendarOptions", this.calendarOptions);
            }
        }
    }

    private configureDataType(instance:IDateBoxComponent):void{
        let value:Date = instance.option("value");
        if(isString(value)){
            value = new Date(value);
            instance.option("value",value);
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
