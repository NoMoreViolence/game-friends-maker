import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent], // Component & Pipes
  imports: [BrowserModule, RouterModule, routing, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [], // Service
  bootstrap: [AppComponent]
})
export class AppModule {}
