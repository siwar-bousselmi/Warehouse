import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  selectedButton: string | null = null;
  constructor(private router: Router) {}

  selectButton(button: string) {
    this.selectedButton = button;
  }

  navigateToCreateWarehouse() {
    this.router.navigate(['/create']);
  }
}
