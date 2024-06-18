import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-tab',
  templateUrl: './language-tab.component.html',
  styleUrl: './language-tab.component.css'
})
export class LanguageTabComponent {

  @Input() textName: string = '';
  @Input() selected: boolean = false;


}
