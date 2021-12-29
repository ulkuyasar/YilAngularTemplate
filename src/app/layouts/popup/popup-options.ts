import { IPopupOptions } from "./ipopup-options";

export class PopupOptions implements IPopupOptions{

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

    constructor(options:IPopupOptions={}){
        if (options.Title !=undefined){
            this.Title = options.Title;
        }

        if (options.Width !=undefined){
            this.Width = options.Width;
        }

        if (options.MinWidth !=undefined){
            this.MinWidth = options.MinWidth;
        }

        if (options.MaxWidth !=undefined){
            this.MaxWidth = options.MaxWidth;
        }

        if (options.Height !=undefined){
            this.Height = options.Height;
        }

        if (options.MinHeight !=undefined){
            this.MinHeight = options.MinHeight;
        }

        if (options.MaxHeight !=undefined){
            this.MaxHeight = options.MaxHeight;
        }

        if (options.Position !=undefined){
            this.Position = options.Position;
        }

        if (options.ShowTitle !=undefined){
            this.ShowTitle = options.ShowTitle;
        }

        if (options.FullScreen !=undefined){
            this.FullScreen = options.FullScreen;
        }

        if (options.ResizeEnabled !=undefined){
            this.ResizeEnabled = options.ResizeEnabled;
        }

        if (options.Shading !=undefined){
            this.Shading = options.Shading;
        }

        if (options.ShadingColor !=undefined){
            this.ShadingColor = options.ShadingColor;
        }

        if (options.ShowCloseButton !=undefined){
            this.ShowCloseButton = options.ShowCloseButton;
        }

        if (options.CloseOnOutsideClick !=undefined){
            this.CloseOnOutsideClick = options.CloseOnOutsideClick;
        }

        if (options.DragEnabled !=undefined){
            this.DragEnabled = options.DragEnabled;
        }

        if (options.ContainerElement !=undefined){
            this.ContainerElement = options.ContainerElement;
        }

        if (options.ElementAttr !=undefined){
            this.ElementAttr = options.ElementAttr;
        }

        if (options.NgClass !=undefined){
            this.NgClass = options.NgClass;
        }
    }
    
}