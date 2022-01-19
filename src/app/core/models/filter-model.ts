import { UUID as uuid} from 'angular2-uuid';
import { PageRequest } from 'src/app/models/core/page';

export  class FilterModel {
    public Id? : number|uuid|string;
    public PageRequest?: PageRequest = {page:1,limit:2000,order:"id",isAssencding:true};
}