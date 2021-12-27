import { Model } from './model';

export class EntityList<T extends Model> extends Model {
       public Entities:Array<T>;
       constructor(){
           super();
           this.Entities = [];
       }
}