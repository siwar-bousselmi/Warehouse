import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { WarehousesComponent } from './features/warehouses/warehouses.component';
import { LayoutComponent } from './features/dashboard/layout/layout.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { 
    path: 'dashboard', 
    component: LayoutComponent, 
    children: [
      { path: '', component: LayoutComponent },
      // autres routes enfants
    ] 
  },
  { 
    path: 'warehouses', 
    component: WarehousesComponent, 
    children: [
      { path: '', component: WarehousesComponent },
      // autres routes enfants
    ] 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
