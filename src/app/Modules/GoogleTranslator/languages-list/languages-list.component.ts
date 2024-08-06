/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Language } from '../../../shared/models/language';
import { } from 'rxjs';

import { Store } from '@ngrx/store';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrl: './languages-list.component.css'
})
export class LanguagesListComponent implements OnInit {

  @Output() languageSelected = new EventEmitter<Language>();


  languageList: Language[] = [];
  languageListAux: Language[] = [];
  languageSearch: string = '';
  columnsNumber = 6;
  languagesPerCol = 0
  selectedLanguage: Language;


  constructor(private http: HttpClient, private store: Store,
    public languageService: LanguageService
  ) {
    this.http.get<JSON>(environment.apiUrl + "/languageList").subscribe(
      (response) => {
        Object.entries(response).forEach(([prefix, value]) => {
          this.languageList.push({ prefix, value, selected: false })
        }
        )

        this.languageListAux = [...this.languageList];
        this.distributeLanguageColumns();
      }

    );
    if (this.languageService.outputSelected) this.selectedLanguage = this.languageService.outputLanguage;
    else this.selectedLanguage = this.languageService.languageSelected;

  }


  ngOnInit() {
  }

  searchLanguage() {

    const filteredLanguages = this.languageListAux.filter(item => {
      let index = 0;
      for (const char of this.languageSearch) {
        index = item.value.indexOf(char, index);
        if (index === -1) {
          return false;
        }
        index++;
      }
      return true;
    });
    this.languageList = [...filteredLanguages];
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth

    if (width > 1178) {
      this.columnsNumber = 6;
    }
    if (width <= 1178) {
      this.columnsNumber = 4;

    }
    if (width <= 1020) {
      this.columnsNumber = 3;

    }
    this.distributeLanguageColumns();
  }


  private distributeLanguageColumns() {
    this.languagesPerCol = Math.ceil(this.languageList.length / this.columnsNumber);
  }



}