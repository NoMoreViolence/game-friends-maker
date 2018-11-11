import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from 'src/app/ngrx/reducer';
import { SignInEffect, AutoSignInEffect } from 'src/app/ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SignService } from 'src/app/services';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContentComponent } from './components/main/content/content.component';
import { SignComponent } from './components/sign/sign.component';
import { SigninComponent } from './components/sign/signin/signin.component';
import { SignupComponent } from './components/sign/signup/signup.component';
import { MyinfoComponent } from './components/myinfo/myinfo.component';

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
    SignupComponent,
    MyinfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([SignInEffect, AutoSignInEffect]),
    StoreDevtoolsModule.instrument({}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      closeButton: false,
      positionClass: 'toast-bottom-left'
    }),
    BrowserAnimationsModule
  ],
  providers: [SignService],
  bootstrap: [AppComponent]
})
export class AppModule {}
