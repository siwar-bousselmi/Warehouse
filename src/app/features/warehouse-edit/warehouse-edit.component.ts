import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../core/services/firestore.service'; // Ajustez le chemin si nécessaire
import { Warehouse } from '../../core/models/warehouse.model'; // Ajustez le chemin si nécessaire
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  styleUrls: ['./warehouse-edit.component.scss']
})
export class WarehouseEditComponent implements OnInit {
  warehouseForm: FormGroup;
  warehouseId: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private warehouseService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.warehouseForm = this.fb.group({
      libelle: ['', Validators.required],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      superficie: ['', [Validators.required, Validators.min(0)]],
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      place: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.warehouseId = params.get('id');
      if (this.warehouseId) {
        this.loadWarehouse();
      }
    });
  }

  loadWarehouse(): void {
    if (!this.warehouseId) return;

    this.loading = true;
    this.warehouseService.getWarehouseById(this.warehouseId)
      .subscribe({
        next: (warehouse: Warehouse | null) => {
          if (warehouse) {
            this.warehouseForm.patchValue(warehouse);
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Erreur lors du chargement des données';
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.warehouseForm.invalid) {
      return;
    }

    if (!this.warehouseId) return;

    this.loading = true;
    this.warehouseService.updateWarehouse(this.warehouseId, this.warehouseForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/warehouses']);
        },
        error: () => {
          this.error = 'Erreur lors de la mise à jour';
          this.loading = false;
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/warehouses']);
  }
}
