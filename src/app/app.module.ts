import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Modules/GoogleTranslator/header/header.component';
import { MainComponent } from './Modules/GoogleTranslator/main/main.component';
import { HamburgerSettingsComponent } from './shared/hamburger-settings/hamburger-settings.component';
import { ProfileImageContainerComponent } from './shared/profile-image-container/profile-image-container.component';
import { AppsIconComponent } from './shared/apps-icon/apps-icon.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { TranslationIconComponent } from './shared/translation-icon/translation-icon.component';
import { LanguageTabComponent } from './shared/language-tab/language-tab.component';
import { TranslatorTextAreaComponent } from './Modules/GoogleTranslator/translator-text-area/translator-text-area.component';
import { DropdownIconComponent } from './shared/dropdown-icon/dropdown-icon.component';
import { FormsModule } from '@angular/forms';
import { TextareaPruebaComponent } from './pruebas/textarea-prueba/textarea-prueba.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguagesListComponent } from './Modules/GoogleTranslator/languages-list/languages-list.component';
import { provideStore } from '@ngrx/store';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HamburgerSettingsComponent,
    ProfileImageContainerComponent,
    AppsIconComponent,
    SettingsComponent,
    TranslationIconComponent,
    LanguageTabComponent,
    TranslatorTextAreaComponent,
    DropdownIconComponent,
    TextareaPruebaComponent,
    LanguagesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideStore()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
