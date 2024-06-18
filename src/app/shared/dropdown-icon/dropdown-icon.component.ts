import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-icon',
  templateUrl: './dropdown-icon.component.html',
  styleUrl: './dropdown-icon.component.css'
})
export class DropdownIconComponent {
  @Input() rotated: boolean = false;

}
