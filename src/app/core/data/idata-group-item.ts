export interface IDataGroupItem{
    isContinuationOnNextPage:boolean;
    key:any;
    items:any;
}

export function isDataGroupItem(arg:any):arg is IDataGroupItem{

    return arg != null && arg.hasOwnProperty('key') && arg.hasOwnProperty('items'); 
}

export function isDataGroupItemArray(arg:any):arg is IDataGroupItem[]{

    return arg instanceof Array && isDataGroupItem(arg[0]); 
}