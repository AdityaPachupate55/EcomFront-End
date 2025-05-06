import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CasualComponent } from './pages/casual/casual.component';
import { LuxuryComponent } from './pages/luxury/luxury.component';
import { DigitalComponent } from './pages/digital/digital.component';
import {AllWatchComponent} from './pages/all-watch/all-watch.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'casual',component:CasualComponent},
  {path:'luxury',component:LuxuryComponent},
  {path:'digital',component:DigitalComponent},
  {path:'all-watch',component:AllWatchComponent},
  {path: '',redirectTo:'/app-home',pathMatch:'full'}
];
