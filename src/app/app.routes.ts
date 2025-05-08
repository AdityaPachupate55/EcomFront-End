import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DigitalComponent } from './pages/digital/digital.component';
import {AllWatchComponent} from './pages/all-watch/all-watch.component';
import { AnalogueComponent } from './pages/analogue/analogue.component';
import { SmartComponent } from './pages/smart/smart.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductManagmentComponent } from './components/admin/product-management/product-management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},

  {path:'analogue',component:AnalogueComponent},
  {path:'smart',component:SmartComponent},
  {path:'digital',component:DigitalComponent},
  {path:'all-watch',component:AllWatchComponent},
  {path:'user-login',component:UserLoginComponent},
  {path:'admin-login',component:AdminLoginComponent},
  {path:'user-register',component:UserRegisterComponent},
  {path:'cart',component:CartComponent},
  {path:'admin-dashboard',component:AdminComponent},
  {path:'admin-product-dashboard',component:ProductManagmentComponent},
  {path:'user-profile',component:UserProfileComponent},

  {path: '',redirectTo:'/app-home',pathMatch:'full'},
];
