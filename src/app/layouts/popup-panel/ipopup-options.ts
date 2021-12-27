export interface IPopupOptions{
    Title?:string;
    Width?:number | string | Function;
    MinWidth?:number | string | Function;
    MaxWidth?:number | string | Function;
    Height?:number | string | Function;
    MinHeight?:number | string | Function;
    MaxHeight?:number | string | Function;
    Position?:any;
    ShowTitle?:boolean;
    FullScreen?:boolean;
    ResizeEnabled?:boolean;
    Shading?:boolean;
    ShadingColor?:string;
    ShowCloseButton?:boolean;
    CloseOnOutsideClick?:boolean;
    DragEnabled?:boolean;
    ContainerElement?:any;
    ElementAttr?:any;
    NgClass?:any;

}