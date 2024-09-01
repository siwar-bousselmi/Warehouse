import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { WarehousesComponent } from './features/warehouses/warehouses.component';
import { LayoutComponent } from './features/dashboard/layout/layout.component';
import { CreateWarehouseComponent } from './features/create-warehouse/create-warehouse.component';
import { WarehouseViewComponent } from './features/warehouse-view/warehouse-view.component';
import { WarehouseEditComponent } from './features/warehouse-edit/warehouse-edit.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'warehouses', component: WarehousesComponent },
      { path: 'warehouses/create', component: CreateWarehouseComponent },
      { path: 'warehouses/view/:id', component: WarehouseViewComponent },
      { path: 'warehouses/edit/:id', component: WarehouseEditComponent },

      // Define other child routes here
      { path: '', redirectTo: 'warehouses', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '' } // Wildcard route for handling unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
