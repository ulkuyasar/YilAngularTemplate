import { Directive, ElementRef, HostBinding, Input } from "@angular/core";

@Directive({
    selector:'[appCollapse]'
})
export class CollopseDirective{

    @HostBinding('class.collapsing')
    private isCollapsing:boolean;
    
    @HostBinding('style.height')
    private height:string;

    @Input()
    private set appCollapse(value:boolean){
        this.measureHeight();
        if(value!=undefined){
            if (value){
                this.hide();
            }else{
                this.show();
            }
        }
    }

    constructor(public elementRef:ElementRef){   
    }

    measureHeight(){
        let element = this.elementRef.nativeElement;
        element.className = element.className.replace('collapse','');
        this.height = element.scrollHeight;
    }

    hide(){
        this.height = this.height + 'px';
        this.isCollapsing = true;
        setTimeout(()=>{
            this.height='0px';
            this.isCollapsing=false;
        },1);
    }

    
    show(){
        this.height =  'px';
        this.isCollapsing = true;
        setTimeout(()=>{
            this.height=this.height+'px';
            this.isCollapsing=false;
        },1);
    }

}