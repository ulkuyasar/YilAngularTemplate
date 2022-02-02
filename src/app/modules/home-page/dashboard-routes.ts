import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/list/dashboard.component";

export const dashboardRoutes:Routes =[
  {
    path:'',
    component: DashboardComponent //,  // FWAccessShowTopologyComponent,
    // children:[
    //   {
    //     path:'add-favourite-link',component:DashboardFavoriteLinkModelComponent,
    //   },
    //   {
    //     path:'add-gallery-image',component:DashboardGaleryImageModelComponent
    //   }
    // ]

  }
]

