import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FirestoreService } from '../../core/services/firestore.service';

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

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
      this.firestoreService.getWarehouses().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

  }

  color = '#ebbcc4'; // Update the color to match the image

  deleteElement(element: Element) {
    // Handle delete action
  }
}

