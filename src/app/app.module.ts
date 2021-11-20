import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { PanellComponent } from './componentes/panell/panell.component';
import { CalculateInputComponent } from './componentes/calculate-input/calculate-input.component';
import { StartComponent } from './componentes/start/start.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { PressupostListComponent } from './componentes/pressupost-list/pressupost-list.component';

const appRoutes:Routes=[
  {path:'', component: StartComponent},
  {path:'Home', component: HomeComponent}
  
  ];
  
  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanellComponent,
    CalculateInputComponent,
    StartComponent,
    ModalComponent,
    PressupostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule, 
    FormsModule
  ],
  entryComponents:[
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
