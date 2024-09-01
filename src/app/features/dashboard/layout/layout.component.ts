import { Component } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  selectedButton: string | null = null;

  selectButton(button: string) {
    this.selectedButton = button;
  }
}
