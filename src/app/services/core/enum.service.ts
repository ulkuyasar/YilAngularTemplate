import { Injector } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import { BaseService } from "src/app/core/services/base-sevice";
import { LocalizationService } from "src/app/localization/localization.service";
import { EnumModel } from "src/app/models/core/enum-model";
import { StringUtilities } from "src/app/utilities/string-utilities";

export class EnumService extends BaseService{
    private _localizationService: LocalizationService;
    constructor(injector:Injector){
        super(injector);
        this._localizationService = injector.get<LocalizationService>(LocalizationService);
    }
    getEnumDescription(enumName:string,value:number,displayNone:boolean = false){
        const enumMethodName:string = 'get'+enumName;
        if(this[enumMethodName] ){
            let dataSource: DataSource = this[enumMethodName]();
            dataSource.pageSize(Number.MAX_VALUE);
            if (dataSource){
                dataSource.load();
                const itemOfValue:EnumModel[] = dataSource.items().filter((enumModel:EnumModel)=>{ enumModel.Value ===value});
            if (itemOfValue.length>0){
                return itemOfValue[0].Description;
            }            }
        }
        if (displayNone){
            return undefined;
        }
        return value;
    }

    public getEnumValue(enumName:string,description:string,operator:ComparisonOperator,caseSensitive=false,displayNone:boolean=false):number[] | string{
        const enumMethodName:string = 'get'+enumName;
        if( this[enumMethodName] ){
            const dataSource: DataSource = this[enumMethodName]();
            if (dataSource){
                dataSource.load();
                const searchPattern = StringUtilities.getValueForComparison(description);
                let itemOfDescription :EnumModel[];
                switch(operator){
                    case ComparisonOperator.Equels:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description)===searchPattern);
                        break;

                    case ComparisonOperator.Contains:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description).includes(searchPattern));
                        break;

                    case ComparisonOperator.StartsWith:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description).startsWith(searchPattern));
                        break;

                    case ComparisonOperator.EndsWith:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description).endsWith(searchPattern));
                        break;

                    case ComparisonOperator.NowEquels:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description)!=(searchPattern));
                        break;

                    case ComparisonOperator.NotContains:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description).includes(searchPattern)===false);
                        break;

                    case ComparisonOperator.NotStartsWith:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description).startsWith(searchPattern)===false);
                        break;

                    case ComparisonOperator.NotEndsWith:
                        itemOfDescription = dataSource.items().filter((enumModel:EnumModel)=> StringUtilities.getValueForComparison(enumModel.Description).endsWith(searchPattern)===false);
                        break;

                    default:
                         break;
                }

                if (itemOfDescription.length>0){
                    return itemOfDescription.map(item=>item.Value);
                }
            }   
        }
        if(displayNone){
            return "undefined";
        }
        return description;
    }

    public getEnumSource(enumName:string):DataSource | undefined{
        const enumMethodName : string = 'get'+enumName;
        if(this[enumMethodName] ){
            const dataSource: DataSource = this[enumMethodName]();
            return dataSource;
        }
        return undefined;

    }

    public getFwAccessFlowEnum(enumName:string):DataSource {
        const enumList: EnumModel[] = [
            {Description:this._localizationService.getMessage('accessreq.openflowrequest.enum.text'),Value:AccessFlowType.OpenFlow},
            {Description:this._localizationService.getMessage('accessreq.addserverrequest.enum.text'),Value:AccessFlowType.AddServer}
        ]
        return new DataSource(enumList);
    }

    public getFwAccessPortEnum(enumName:string):DataSource {
        const enumList: EnumModel[] = [
            {Description:this._localizationService.getMessage('accessreq.tcp.enum.text'),Value:AccessFlowPortType.Tcp},
            {Description:this._localizationService.getMessage('accessreq.udp.enum.text'),Value:AccessFlowPortType.Udp},
            {Description:this._localizationService.getMessage('accessreq.icpmping.enum.text'),Value:AccessFlowPortType.IcpmPing}
        ]
        return new DataSource(enumList);
    }

}