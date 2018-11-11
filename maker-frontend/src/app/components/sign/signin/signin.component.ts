import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, tap, first, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import lib from 'src/app/lib';
import { AppState, User } from 'src/app/store/models';
import { SignActions } from 'src/app/store/actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements AfterViewInit, OnDestroy {
  public eError = false;
  public pError = false;
  @ViewChild('em') public email: ElementRef<HTMLInputElement>;
  @ViewChild('pw') public password: ElementRef<HTMLInputElement>;
  public user$: Observable<User>;
  public subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private router: Router, private translate: TranslateService, private toast: ToastrService) {
    this.user$ = store.select('user');
  }

  ngAfterViewInit() {
    this.user$.pipe(first()).subscribe(userData => {
      if (userData.success === true) {
        this.router.navigateByUrl('/main');
        this.translate
          .get('Sign.in.already')
          .pipe(first())
          .subscribe(comment => this.toast.info(comment));
      } else {
        const email = fromEvent(this.email.nativeElement, 'input')
          .pipe(
            tap(x => (this.eError = false)),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.email.nativeElement.value === '') {
              this.eError = false;
            } else {
              this.eError = !lib.emailRegex.test(this.email.nativeElement.value);
            }
          });

        const password = fromEvent(this.password.nativeElement, 'input')
          .pipe(
            filter(input => {
              console.log(input.returnValue);
              return true;
            }),
            tap(x => (this.pError = false)),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.password.nativeElement.value === '') {
              this.pError = false;
            } else {
              this.pError = !lib.passwordRegex.test(this.password.nativeElement.value);
            }
          });

        this.subscriptions.push(email);
        this.subscriptions.push(password);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.map(x => x.unsubscribe());
  }

  public changeFocus = (propertyName: string): void => {
    if (this[propertyName]) {
      this[propertyName].nativeElement.focus();
    }
  }

  public signIn = (email: HTMLInputElement, password: HTMLInputElement): void => {
    this.eError = !lib.emailRegex.test(this.email.nativeElement.value);
    this.pError = !lib.passwordRegex.test(this.password.nativeElement.value);

    if (this.eError || this.pError) {
      this.translate
        .get('Sign.in.notright')
        .pipe(first())
        .subscribe(comment => this.toast.error(comment));
    } else {
      this.store.dispatch(new SignActions.SignIn({ email: email.value, password: password.value }));
    }
  }
}
