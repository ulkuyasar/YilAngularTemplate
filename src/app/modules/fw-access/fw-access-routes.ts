import { Routes } from "@angular/router";
import { AuthenticationScreenGuard } from "src/app/authentication/authentication-screen-guard..service";
import { FWAccessTopologyNodeComponent } from "./components/topology-node/list/fw-access-topology-node.component";
import { FwAccessTopologyNodeModelComponent } from "./components/topology-node/model/fw-access-topology-node-model.component";

export const FwAccessRoutes:Routes =[
  // {
  //   path:'fwaccessshowtopology',
  //   component:  // FWAccessShowTopologyComponent,
  // },
  {
    path:'fwaccesstopologynode',component:FWAccessTopologyNodeComponent,canActivate:[AuthenticationScreenGuard],data:{screenId:200},
    children:[
      {
        path:'add',component:FwAccessTopologyNodeModelComponent
      },
      {
        path:'edit/:id',component:FwAccessTopologyNodeModelComponent
      }
    ]
  }

]

