import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from '../../core/services/firestore.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss']
})
export class CreateWarehouseComponent implements OnInit {
  warehouseForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private dialog: MatDialog,
    private firestoreService: FirestoreService) {
    this.warehouseForm = this.fb.group({
      libelle: ['', Validators.required],
      longitude: ['', [Validators.required, Validators.min(0), Validators.max(180)]],
      superficie: ['', [Validators.required, Validators.min(0)]],
      latitude: ['', [Validators.required, Validators.min(0), Validators.max(90)]],
      place: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    // Any additional initialization can go here
  }

  onSubmit(): void {
    if (this.warehouseForm.valid) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          // Save data to Firebase
          this.firestoreService.saveWarehouse(this.warehouseForm.value).then(() => {
            console.log('Warehouse saved successfully');
            this.router.navigate(['/warehouses']); // Redirect after saving
          }).catch(error => {
            console.error('Error saving warehouse:', error);
          });
        }
      });
    }else{
      this.warehouseForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.warehouseForm.reset();
  }
  
}
