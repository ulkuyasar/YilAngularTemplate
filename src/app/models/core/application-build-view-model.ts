import { Model } from "src/app/core/models/model";
import { BuildState } from "./build-state";

export class ApplicationBuildViewModel extends Model{
 
    BuildState?:BuildState;
    JobType?:string;

}
