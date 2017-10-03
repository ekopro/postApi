import { NgModule }                           from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }                         from '@angular/http';


import { AppComponent }  from './app.component';
import { EIDetailComponent } from './ei-detail.component';
import { EIService }          from './ei.service';
import { CatalogueService } from './catalogue.service'
import { AppRoutingModule }     from './app-routing.module';
import { EISComponent }      from './eis.component';
import { EICreateFormComponent } from './ei-create.component'

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
     AppComponent,
     EIDetailComponent,
     EISComponent,
     EICreateFormComponent
   ],
  providers: [EIService, CatalogueService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
