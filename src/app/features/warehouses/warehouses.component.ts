import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'superficie', 'place', 'actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  searchTerm: string = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  color = 'pink'


  deleteElement(element: Element) {
    // Handle delete action
  }
}

// Example data type and data
export interface Element {
  libelle: string;
  superficie: string;
  place: string;
}

const ELEMENT_DATA: Element[] = [
  {libelle: "1", superficie: 'Warehouse A', place: 'Location A'},
  {libelle: "2", superficie: 'Warehouse B', place: 'Location B'},
  // Add more data here
];