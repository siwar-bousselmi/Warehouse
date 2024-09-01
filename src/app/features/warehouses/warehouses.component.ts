import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from '../../core/services/firestore.service';
import { Warehouse} from '../../core/models/warehouse.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component'; 


@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'superficie', 'place', 'actions'];
  dataSource = new MatTableDataSource<Element>();
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private firestoreService: FirestoreService, private dialog: MatDialog,) {}

  ngOnInit() {
      this.loadData();

  }

  loadData(){
    this.firestoreService.getWarehouses().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  color = '#ebbcc4'; // Update the color to match the image

  deleteElement(warehouse: any) {
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
}

