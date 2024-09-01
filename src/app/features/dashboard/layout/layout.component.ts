import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  selectedButton: string | null = null;
  breadcrumbs: Array<{ label: string, url?: string }> = [
    { label: 'Tableau de Bord', url: '/warehouses' },
    { label: 'Administration', url: '/warehouses' },
    
  ];

  constructor(private router: Router) {}

  selectButton(button: string) {
    this.selectedButton = button;
  }

}
