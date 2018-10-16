import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// Route
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
// Store
import { StoreModule } from '@ngrx/store';
import { personReducer } from './ngrx/reducer';
// Components
import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';
import { WriteComponent } from './write/write.component';
// Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, ReadComponent, WriteComponent], // Component & Pipes
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      persons: personReducer
    }),
    RouterModule,
    routing,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [], // Service
  bootstrap: [AppComponent]
})
export class AppModule {}
