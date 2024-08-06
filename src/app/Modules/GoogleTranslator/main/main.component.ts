import { HttpClient } from '@angular/common/http';
import { Component, input, OnInit } from '@angular/core';
import { Language } from '../../../shared/models/language';
import { LanguageService } from '../language.service';
export enum TranslationTypes {
  text = 'text',
  webSite = 'webSite'
}




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  TranslationTypes = TranslationTypes;
  translationType: string;
  rotated: boolean = false;
  languageList: Language[] = [];

  //Views


  lastSelectedDropdownNumber: number = 0;
  showLanguageList: boolean[] = [false, false];

  inputLanguages: Language[] = [
    { prefix: 'auto', value: 'Detectar idioma', selected: true },
    { prefix: 'es', value: 'español', selected: false },
    { prefix: 'en', value: 'inglés', selected: false },
    { prefix: 'fr', value: 'francés', selected: false }
  ]

  outputLanguages: Language[] = [
    { prefix: 'en', value: 'inglés', selected: true },
    { prefix: 'es', value: 'español', selected: false },
    { prefix: 'fr', value: 'francés', selected: false }
  ]

  constructor(private http: HttpClient, public languageService: LanguageService) {
    this.translationType = TranslationTypes.text;
  }

  ngOnInit() {
    this.languageService.eventoEmitter.subscribe(
      () => {

        let inputAlreadyAtTab = false;
        if (!this.languageService.outputSelected) {


          this.inputLanguages.forEach(inputLanguage => {
            if (inputLanguage.prefix === this.languageService.languageSelected.prefix) {

              inputLanguage.selected = true;
              inputAlreadyAtTab = true;
            } else inputLanguage.selected = false;

          });

          if (this.languageService.outputLanguage.prefix === this.languageService.languageSelected.prefix) this.reorderIfRepeats(true);

        }
        else {
          this.outputLanguages.forEach(outputLanguage => {
            if (outputLanguage.prefix === this.languageService.outputLanguage.prefix) {
              outputLanguage.selected = true;
              inputAlreadyAtTab = true;
            } else outputLanguage.selected = false;
          });
          if (this.languageService.outputLanguage.prefix === this.languageService.languageSelected.prefix) this.reorderIfRepeats(false);
        }
        if (this.showLanguageList.includes(true)) {
          this.showLanguageList.fill(false);
        }
        if (!inputAlreadyAtTab && !this.languageService.outputSelected) this.changeInputLanguages();
        if (!inputAlreadyAtTab && this.languageService.outputSelected) this.changeOutputLanguages();
      }


    )
  }

  changeInputLanguages() {
    for (let i = this.inputLanguages.length - 1; i > 0; i--) {
      this.inputLanguages[i] = this.inputLanguages[i - 1];
    }
    this.inputLanguages[1] = this.languageService.languageSelected;
    this.inputLanguages[1].selected = true;

  }

  changeOutputLanguages() {
    for (let i = this.outputLanguages.length - 1; i >= 0; i--) {
      this.outputLanguages[i] = this.outputLanguages[i - 1];
    }
    this.outputLanguages[0] = this.languageService.outputLanguage;
    this.outputLanguages[0].selected = true;
  }



  handleShowLanguageList(dropdownNumber: number) {
    let rotateAll = false;
    for (let i = 0; i < this.showLanguageList.length; i++) {

      if (dropdownNumber != i && this.showLanguageList[i]) {
        rotateAll = true;
      }
    }
    if (rotateAll) {
      this.showLanguageList.fill(false);
    } else {
      this.showLanguageList[dropdownNumber] = !this.showLanguageList[dropdownNumber];

    }

  }

  selectInputLanguage(language: Language) {
    this.languageService.outputSelected = false;
    this.inputLanguages.forEach(inputLanguage => {
      if (inputLanguage.prefix === language.prefix) {
        inputLanguage.selected = true;
      } else {
        inputLanguage.selected = false;
      }
    })
    this.languageService.selectLanguage(language);
  }

  selectOutputLanguage(language: Language) {
    this.outputLanguages.forEach(outputLanguage => {
      if (outputLanguage.prefix === language.prefix) {
        outputLanguage.selected = true;
      } else {
        outputLanguage.selected = false;
      }
    });
    this.languageService.selectOutputLanguage(language);
  }


  reorderIfRepeats(inputIsSelected: boolean) {


    if (inputIsSelected) {
      this.outputLanguages.forEach(language => {
        if (language.prefix === this.languageService.outputLanguage.prefix) {
          language.selected = false;
        }
      })
      for (let i = 0; i < this.outputLanguages.length; i++) {
        if (this.languageService.outputLanguage.prefix !== this.outputLanguages[i].prefix) {
          this.languageService.outputLanguage = this.outputLanguages[i];
          this.outputLanguages[i].selected = true;
          return;
        }
      }


    } else {
      this.inputLanguages.forEach(language => {
        if (language.prefix === this.languageService.languageSelected.prefix) {
          language.selected = false;
        }
      });
      for (let i = 0; i < this.inputLanguages.length; i++) {
        if (this.languageService.languageSelected.prefix !== this.inputLanguages[i].prefix) {
          this.languageService.languageSelected = this.inputLanguages[i];
          this.inputLanguages[i].selected = true;
          return;
        }
      }
    }

  }

  switchLanguages() {

    //Duplciate objects to not assign the same memory location
    const inputSelected = Object.assign({}, this.inputLanguages.find(language => language.selected === true));
    const outputSelected = Object.assign({}, this.outputLanguages.find(language => language.selected === true));

    if(inputSelected && outputSelected){

      const inputSelectedIsAtOutput = !!this.outputLanguages.find(language => language.prefix === inputSelected.prefix);
      const outputSelectedIsAtInput = !!this.inputLanguages.find(language => language.prefix === outputSelected.prefix);

      if(inputSelectedIsAtOutput){
        this.outputLanguages.forEach(language => {
          if(language.prefix === inputSelected.prefix){
            language.selected = true;
          } else {
            language.selected = false;
          }
        });
      }else{
        this.outputLanguages[2] = Object.assign({}, this.outputLanguages[1]);
        this.outputLanguages[1] = Object.assign({}, this.outputLanguages[0]);
        this.outputLanguages.forEach(language => {
          if(language.selected === true){
            language.selected = false;
          }
        })
        this.outputLanguages[0] = inputSelected;
      }

      if(outputSelectedIsAtInput){
        this.inputLanguages.forEach(language => {
          if(language.prefix === outputSelected.prefix){
            language.selected = true;
          } else {
            language.selected = false;
          }
        });
      } else{
        this.inputLanguages[3] = Object.assign({}, this.inputLanguages[2]);
        this.inputLanguages[2] = Object.assign({}, this.inputLanguages[1]);
        this.inputLanguages.forEach(language => {
          if(language.selected === true){
            language.selected = false;
          }
        });
        this.inputLanguages[1] = outputSelected;
      }
      

    }

  
 /*    const inputSelected = this.inputLanguages.find(language => language.selected === true);

    const auxiliarArray = [...this.outputLanguages]; //Duplicate outputLanguages array
    const newInputArray = this.inputLanguages.slice(1); //Duplitace inptuArray starting from index 1 of array, because (0) is always 'Auto Detect' option

    this.outputLanguages = [...newInputArray];
    this.inputLanguages = this.inputLanguages.slice(0, 1)
    this.inputLanguages = this.inputLanguages.concat(auxiliarArray);
    this.inputLanguages[0].selected = false;

    if (inputSelected?.prefix === 'auto') {
      this.outputLanguages[0].selected = true;
    }

    this.inputLanguages.forEach(language => {
      if (language.selected === true) this.selectInputLanguage(language);
    });
    this.outputLanguages.forEach(language => {
      if (language.selected === true) this.selectOutputLanguage(language);
    });
 */

  }

  autoLanguageSelected(){
    const inputLanguage = this.inputLanguages.find(language => language.selected === true);

    if(inputLanguage){
      return inputLanguage.prefix === 'auto';
    }else {
      return false;
    }
   
  }
}