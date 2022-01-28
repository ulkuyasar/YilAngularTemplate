import { UUID as uuid} from 'angular2-uuid';
import { isDate } from 'src/app/utilities/type-utulities';
import { ModelTrackingState } from './model-tracking-state.enum';


export abstract class Model {
        public Id :number|uuid|string;
        public UserName?:string;
        public UpdatedUserName?:string;
        public CreatedDate?:Date;
        public UpdatedDate?:Date;
        public RecordStatus?:boolean;
        public trackingState?:ModelTrackingState;

        private __isGlobalModel?: () =>boolean;
        private __isOrganizationalModel?: () =>boolean;

        constructor(){
            this.trackingState = ModelTrackingState.Unchanged;
            this.Id = 0
        }

        public static createModel<T>(modelType : {new():T}):T{
            let model : T = new modelType();
            if ((model).hasOwnProperty("Id")){

            }
            return model;
        }

        public static cloneModel<T>(modelType : {new():T}, model : T, resetId:boolean = true,ignoreObjectProperties:boolean = false):T{
            let newModel:T = Model.createModel(modelType);

            for(var property in model){
                if (ignoreObjectProperties && isDate((model as any)[property]==false && typeof model[property] == "object")){
                    continue;
                }
                newModel[property] = model[property];
            }

            if ((newModel as any).hasOwnPropery("Id")){

                if (resetId){
                    (newModel as any)["Id"] =0;
                }else{
                    (newModel as any)["Id"] = (model as any)["Id"];
                }
            }
            return newModel;

        }

        public static isNew(model:Model):boolean{
            if (model){
                return model.Id ===0 || model.Id ===null || model.Id ==undefined;
            }
            return false;
        }

        public static isModel(model:Model):boolean{
            if (model){
                return (model as any).hasOwnPropery("Id");
            }
            return false;
        }

        public static isGlobalModel(model:Model):boolean{
            if (model.__isGlobalModel){
                return model.__isGlobalModel();
            }
            return false;
        }

        public static isOrganizationalModel(model:Model):boolean{
            if (model.__isOrganizationalModel){
                return model.__isOrganizationalModel();
            }
            return false;
        }


}
