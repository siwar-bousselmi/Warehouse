import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { WarehousesComponent } from './features/warehouses/warehouses.component';
import { LayoutComponent } from './features/dashboard/layout/layout.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'warehouses', component: WarehousesComponent },
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
