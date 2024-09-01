import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatIconModule } from '@angular/material/icon';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Import AngularFirestoreModule
import { AppComponent } from './app.component';
import { AuthComponent } from './features/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from './core/services/auth.service';
import { FirestoreService } from './core/services/firestore.service'; // Import your Firestore service
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WarehousesComponent } from './features/warehouses/warehouses.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './features/dashboard/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateWarehouseComponent } from './features/create-warehouse/create-warehouse.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ConfirmDialogComponent,
    WarehousesComponent,
    LayoutComponent,   
    CreateWarehouseComponent

  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatTableModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule, // Import AngularFirestoreModule
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule, // Importer FormsModule
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    ReactiveFormsModule,

],
  providers: [AuthService, FirestoreService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
