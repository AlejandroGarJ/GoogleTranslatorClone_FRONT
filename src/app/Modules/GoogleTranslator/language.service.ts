import { Injectable } from '@angular/core';
import { Language } from '../../shared/models/language';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languageSelected: Language;
  eventoEmitter: Subject<void> = new Subject<void>();
  outputLanguage: Language;
  outputSelected: boolean = false;
  constructor() {
    this.languageSelected = {
      prefix: 'auto',
      value: 'Detectar idioma',
      selected: true
    }
    this.outputLanguage = {
      prefix: 'en',
      value: 'inglés',
      selected: true
    }
  }

  selectLanguage(language: Language) {
    if (this.outputSelected) this.selectOutputLanguage(language);
    else {

      this.languageSelected = language;
      this.eventoEmitter.next();
    }

  }

  selectOutputLanguage(language: Language) {
    this.outputSelected = true;
    this.outputLanguage = language;
    this.eventoEmitter.next();
  }
}
