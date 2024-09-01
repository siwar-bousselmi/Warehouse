import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from '../../core/services/firestore.service';
import { Warehouse } from '../../core/models/warehouse.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'; 
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'superficie', 'place', 'actions'];
  dataSource = new MatTableDataSource<Warehouse>();
  searchTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private firestoreService: FirestoreService, private dialog: MatDialog,private router: Router // Inject Router
  ) {}

  ngOnInit() {
    this.loadData();
    // Bind the filter to the search term
    this.dataSource.filterPredicate = (data: Warehouse, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter.toLowerCase());
    };
  }

  // Update the filter when search term changes
  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  loadData() {
    this.firestoreService.getWarehouses().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Bind the paginator after loading data
    });
  }

  color = '#e9cbd0'; // Update the color to match the image

  deleteElement(warehouse: Warehouse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Supprimer cet entrepôt ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.firestoreService.deleteWarehouse(warehouse.id).then(() => {
          this.loadData(); // Recharger les données après la suppression
        }).catch(error => {
          console.error('Error deleting warehouse:', error);
        });
      }
    });
  }

  viewElement(warehouse: Warehouse) {
    this.router.navigate(['/warehouses/view', warehouse.id]);
  }

  editElement(warehouse: Warehouse) {
    this.router.navigate(['/warehouses/edit', warehouse.id]);
  }
  
  navigateToCreateWarehouse() {
    this.router.navigate(['/warehouses/create']);
  }

}
