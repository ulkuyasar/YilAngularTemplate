import { AuthenticationContextType } from "./authentication-context-type.enum";
import { OrganizationType } from "./organization-type.enum";

export const AuthenticationKey={

  SKTStandart:"1_0",
  ESMStandart:"2_0",
  ESMCompony:"2_1",

  generate:(organizationType:OrganizationType,authenticationContextType:AuthenticationContextType)=>{
    return ((organizationType!=null && organizationType!=undefined) ?
    organizationType.toString() :"" ) + "_" + ((authenticationContextType !=null && authenticationContextType !=undefined) ?
    authenticationContextType.toString() :"");
  }


}
