import { OnChanges, SimpleChange, SimpleChanges } from "@angular/core";

export function Notify(propertyName?:string ):PropertyDecorator{
    return function(target:Object,propertyKey:string ):void{

        const _notificationTable_:string = "___notificationTable___";

        const getNotificationKey:()=>string = () =>{
            let notificationKey : string = propertyKey;
            if (propertyName){
                notificationKey =propertyName;
            }
            return notificationKey;
        }

        let notificationTable:Map<string,string[]> = target[_notificationTable_];
        if (!notificationTable){
            notificationTable = new Map<string,string[]>();
            target[_notificationTable_] = notificationTable;
        }

        if (notificationTable.has(propertyKey)){
            notificationTable.get(propertyKey).push(getNotificationKey());
            return;
        }

        const notificationKeys:string[] = [];
        notificationTable.set(propertyKey,notificationKeys);
        notificationKeys.push(getNotificationKey());

        const _valueMap:Map<OnChanges,any> = new Map<OnChanges,any>();
        _valueMap.set(target as OnChanges,target[propertyKey]);

        const ensureMap:(instance:OnChanges) => void =(instance:OnChanges) =>{
            if(_valueMap.has(instance) === false){
                _valueMap.set(instance,_valueMap.get(target as OnChanges));
            }
        }

        const createSimpleChange:(previousValue:any,currentValue:any) => SimpleChanges = (previousValue:any,currentValue:any)=>{
            let changes :SimpleChanges={};
            let change :SimpleChange=new SimpleChange(previousValue,currentValue,false);
            for (let key of notificationKeys) {
                changes[key] = change;   
            }
            return changes;
        }

        const getter = function(){
            ensureMap(this);
            return _valueMap.get(this);
        }

        const setter = function(value:any){
            let currentValue = this[propertyKey];
            if (currentValue !== value){
                _valueMap.set(this,value);
            
                if (this.ngOnChanges){
                    let changes:SimpleChanges = createSimpleChange(currentValue,value);
                    this.ngOnChanges(changes);
                }
            }
        }

        Object.defineProperties(target,propertyKey,{
            get:getter,
            set:setter,
            configurable:true,
            enumerable:true
        });

    }
}