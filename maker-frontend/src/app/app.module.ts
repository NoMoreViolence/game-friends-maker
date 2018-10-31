import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// Route
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
// Store
import { StoreModule } from '@ngrx/store';
import { signReducer } from './ngrx/reducer';
import { EffectsModule } from '@ngrx/effects';
import { SignInEffect } from './effects';
// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContentComponent } from './components/main/content/content.component';
import { SignComponent } from './components/sign/sign.component';
import { SigninComponent } from './components/sign/signin/signin.component';
import { SignupComponent } from './components/sign/signup/signup.component';

export const HttpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    ContentComponent,
    SignComponent,
    SigninComponent,
    SignupComponent
  ], // Component & Pipes
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: signReducer
    }),
    EffectsModule.forRoot([SignInEffect]),
    RouterModule,
    routing,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [], // Service
  bootstrap: [AppComponent]
})
export class AppModule {}
