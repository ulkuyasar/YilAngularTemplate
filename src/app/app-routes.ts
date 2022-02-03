import { Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { RootComponent } from "./components/root/root.component";
import { RouteNotFoundComponent } from "./components/route-not-found/route-not-found.component";
import { ConfigResolver } from "./config/config.resolver";
import { LocalizationResolver } from "./localization/localization.resolver";
import { StartupResolver } from "./startup/startup.resolver";

export const appRoutes:Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
   path:'',
   component:RootComponent,
   resolve:{
     WelcomeMessage:StartupResolver,
     Config:ConfigResolver,
     Language:LocalizationResolver
   },
   children:[
      {
        path:'main',
        component:MainComponent,
       children:
        [
          {
            path:'',
            loadChildren:()=>import('./modules/home-page/dashboard.module').then(mod=>mod.DashboardModule)
          },
          {
            path:'fwaccess',
            loadChildren:()=>import('./modules/fw-access/fw-access.module').then(mod=>mod.FwAccessModule)
          }
        ]
      },
      {
        path:"**",
        component:RouteNotFoundComponent
      }
   ]
  }
];
