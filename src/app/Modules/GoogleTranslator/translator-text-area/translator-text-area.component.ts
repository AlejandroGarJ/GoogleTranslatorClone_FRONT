/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { apiUrl } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { LanguageService } from '../language.service';
@Component({
  selector: 'app-translator-text-area',
  templateUrl: './translator-text-area.component.html',
  styleUrl: './translator-text-area.component.css'
})
export class TranslatorTextAreaComponent implements AfterViewInit {
  inputText: string = '';
  outputText: string = '';
  traduciendo: string = '';
  @ViewChild('textareaEditable') textareaEditable!: ElementRef;
  constructor(private http: HttpClient, private languageService: LanguageService) { }

  adjustTextareaHeight(element: any): void {
    this.inputText = element.target.textContent
    this.traduciendo = 'traduciendo...';

    const textarea = document.getElementById('textareaEditable') as HTMLTextAreaElement;

    const textareaContainer = document.getElementById('textAreaContainer') as HTMLTextAreaElement;
    textarea.style.fontSize = this.inputText.length <= 64 ? '24px' : '18px';
    if (textarea.scrollHeight !== textarea.clientHeight) {
      textarea.style.height = textarea.scrollHeight + 'px';
      textareaContainer.style.height = 'fit-content';

    }
    const textarea2 = document.getElementById('textareaEditable2') as HTMLTextAreaElement;
    if (textarea.textContent === '') textarea2.textContent = '';
    else {
      textarea2.textContent = this.traduciendo;
    }
    textarea2.style.fontSize = textarea.style.fontSize;
  }

  deleteInputText() {
    this.inputText = '';
    this.outputText = '';
    const textarea = document.getElementById('textareaEditable') as HTMLTextAreaElement;
    const textarea2 = document.getElementById('textareaEditable2') as HTMLTextAreaElement;
    if (textarea && textarea2) {
      textarea.textContent = '';
      textarea2.textContent = '';
      textarea.focus();
    }
  }

  ngAfterViewInit() {

    this.setupContentEditable();
  }
  setupContentEditable() {
    const textarea = document.getElementById('textareaEditable') as HTMLTextAreaElement;
    fromEvent(textarea, 'input').pipe(
      map((event: any) => event.target.innerText),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      const textarea = document.getElementById('textareaEditable') as HTMLTextAreaElement;
      if (textarea.textContent !== '') this.translate(value);


    });
    this.languageService.eventoEmitter.pipe(
      debounceTime(500)
    ).subscribe(
      () => {
        const textarea = document.getElementById('textareaEditable') as HTMLTextAreaElement;
        if (textarea.textContent || textarea.textContent != '') {
          console.log("No es vacio");
          this.translate(textarea.textContent);
        } else {
          console.log('Es vacio');
          textarea.textContent = ''
          const textarea2 = document.getElementById('textareaEditable2') as HTMLTextAreaElement;
          textarea2.textContent = '';
        }
      }
    );
  }

  translate(value: any) {

    this.http.post<any>(apiUrl + "/translate", { inputLanguage: this.languageService.languageSelected.prefix, inputText: value, language: this.languageService.outputLanguage.prefix }).subscribe(
      (response) => {
        const textarea = document.getElementById('textareaEditable') as HTMLTextAreaElement;
        const textarea2 = document.getElementById('textareaEditable2') as HTMLTextAreaElement;
        if (textarea.textContent !== '') textarea2.textContent = response;



      }
    );
  }



}