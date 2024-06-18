import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Modules/GoogleTranslator/main/main.component';
import { TextareaPruebaComponent } from './pruebas/textarea-prueba/textarea-prueba.component';

const routes: Routes = [
    { path: '', redirectTo: '/googleTranslatorClone', pathMatch: 'full' },
    { path: 'googleTranslatorClone', component: MainComponent },
    { path: 'pruebas', component: TextareaPruebaComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
