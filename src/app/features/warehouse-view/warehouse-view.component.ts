import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../core/services/firestore.service';
import { Warehouse } from '../../core/models/warehouse.model';

@Component({
  selector: 'app-warehouse-view',
  standalone: true,
  imports: [],
  templateUrl: './warehouse-view.component.html',
  styleUrl: './warehouse-view.component.scss'
})
export class WarehouseViewComponent {
  warehouse: Warehouse | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.firestoreService.getWarehouseById(id).subscribe(data => {
        if (data) {
          this.warehouse = data;
        } else {
          this.error = 'Entrepôt non trouvé';
        }
        this.loading = false;
      }, error => {
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
      });
    });
  }
}
