import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() showCreateButton: boolean = false;
  @Output() createClick = new EventEmitter<void>();

  onCreateClick(): void {
    this.createClick.emit();
  }
}
