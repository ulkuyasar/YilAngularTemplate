export interface ITextBoxComponent {
    __maskText?:string;
    _value?:any;
    _textValue?:string;
    option?:(optionName:string,value?:any)=>any;
}