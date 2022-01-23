
    export interface ICalendarEditorOptions{
        pickertype?: Date|number|string;
        min?:Date|number|string;
        minZoomLevel?:string;
        max?:Date|number|string;
        maxZoomLevel?:string;   
        zoomLevel?:string;
        showTodayButton?:boolean;
        readonly?:boolean;
        disabled?:boolean;
        width?: number|string|Function;
        height?: number|string|Function;


    }