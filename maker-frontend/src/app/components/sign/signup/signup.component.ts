import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, fromEvent, forkJoin, Subscription } from 'rxjs';
import { first, tap, debounceTime, combineLatest } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import lib from 'src/app/lib';
import { AppState, User } from 'src/app/ngrx/models';
import { SignService } from 'src/app/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit, OnDestroy {
  public usernameCheck = false;
  public usernamePending = false;
  public emailCheck = false;
  public emailPending = false;
  public uError = false;
  public eError = false;
  public pError = false;
  public rpError = false;
  @ViewChild('name')
  public username: ElementRef<HTMLInputElement>;
  @ViewChild('em')
  public email: ElementRef<HTMLInputElement>;
  @ViewChild('pw')
  public password: ElementRef<HTMLInputElement>;
  @ViewChild('rpw')
  public rpassword: ElementRef<HTMLInputElement>;
  public signUpPending = false;
  public signUpComment: Observable<string[]> = forkJoin([this.translate.get('Sign.up.success'), this.translate.get('Sign.up.failure')]);
  public duplicationComment: Observable<string[]> = forkJoin([this.translate.get('Sign.up.checks'), this.translate.get('Sign.up.checkf')]);

  public user: Observable<User>;
  public subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private sign: SignService,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    this.user = this.store.select('user');
  }

  ngAfterViewInit() {
    this.user.pipe(first()).subscribe(userData => {
      if (userData.success === true) {
        this.router.navigateByUrl('/main');
        this.translate
          .get('Sign.up.already')
          .pipe(first())
          .subscribe(comment => this.toast.info(comment));
      } else {
        const username = fromEvent(this.username.nativeElement, 'input')
          .pipe(
            tap(() => {
              this.usernameCheck = false;
              this.uError = false;
            }),
            debounceTime(600)
          )
          .subscribe(() => {
            if (this.username.nativeElement.value === '') {
              this.uError = false;
            } else {
              this.uError = !lib.usernameRegex.test(this.username.nativeElement.value);
            }
          });
        const email = fromEvent(this.email.nativeElement, 'input')
          .pipe(
            tap(() => {
              this.emailCheck = false;
              this.eError = false;
            }),
            debounceTime(600)
          )
          .subscribe(() => {
            if (this.email.nativeElement.value === '') {
              this.eError = false;
            } else {
              this.eError = !lib.emailRegex.test(this.email.nativeElement.value);
            }
          });
        const password = fromEvent(this.password.nativeElement, 'input')
          .pipe(
            tap(() => (this.pError = false)),
            debounceTime(600)
          )
          .subscribe(() => {
            if (this.password.nativeElement.value === '') {
              this.pError = false;
            } else {
              this.pError = !lib.passwordRegex.test(this.password.nativeElement.value);
              this.rpError = this.rpassword.nativeElement.value === this.password.nativeElement.value;
            }
          });
        const rpassword = fromEvent(this.rpassword.nativeElement, 'input')
          .pipe(
            tap(() => (this.rpError = false)),
            debounceTime(600)
          )
          .subscribe(() => {
            if (this.rpassword.nativeElement.value === '') {
              this.rpError = false;
            } else {
              this.rpError = !(this.rpassword.nativeElement.value === this.password.nativeElement.value);
            }
          });

        this.subscriptions.push(username);
        this.subscriptions.push(email);
        this.subscriptions.push(password);
        this.subscriptions.push(rpassword);
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

  public doubleCheck = (element: HTMLInputElement, what: string): void => {
    this[`${what.split('')[0]}Error`] = !lib[`${what}Regex`].test(element.value);
    if (this[`${what}Pending`] === false && this[`${what.split('')[0]}Error`] === false) {
      this[`${what}Pending`] = true;
      this.sign
        .duplicationCheck(element.value, what)
        .pipe(combineLatest(this.duplicationComment, (origin, comment) => ({ ...origin, comment })))
        .subscribe(
          res => {
            if (res.success) {
              this[`${what}Pending`] = false;
              this[`${what}Check`] = true;
              this.toast.info(res.comment[0]);

              what === 'username' ? this.changeFocus('email') : this.changeFocus('password');
            } else {
              this[`${what}Pending`] = false;
              this[`${what}Check`] = false;
              this.toast.error(res.comment[1]);
            }
          },
          err => {
            this[`${what}Pending`] = false;
            this[`${what}Check`] = false;
            this.translate
              .get('Sign.up.checkf')
              .pipe(first())
              .subscribe(comment => this.toast.error(`${what} ${comment}`));
          }
        );
    } else if (this[`${what.split('')[0]}Error`]) {
      this.translate
        .get('Sign.up.notright')
        .pipe(first())
        .subscribe(comment => this.toast.error(comment));
    } else {
      this.translate
        .get('Sign.up.pending')
        .pipe(first())
        .subscribe(comment => this.toast.info(comment));
    }
  }

  public signUp = (username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, rpassword: HTMLInputElement): void => {
    this.uError = !lib.usernameRegex.test(username.value);
    this.eError = !lib.emailRegex.test(email.value);
    this.pError = !lib.passwordRegex.test(password.value);
    this.rpError = !(rpassword.value === password.value);

    if (this.uError || this.eError || this.pError || this.rpError || !this.usernameCheck || !this.emailCheck) {
      if (!this.usernameCheck || !this.emailCheck) {
        this.translate
          .get('Sign.up.notchecked')
          .pipe(first())
          .subscribe(comment => this.toast.error(comment));
      } else {
        this.translate
          .get('Sign.up.notright')
          .pipe(first())
          .subscribe(comment => this.toast.error(comment));
      }
    } else {
      this.signUpPending = true;
      this.sign
        .signUp(username.value, email.value, password.value)
        .pipe(combineLatest(this.signUpComment, (origin, comment) => ({ ...origin, comment })))
        .subscribe(
          res => {
            this.signUpPending = false;
            if (res.success) {
              this.router.navigateByUrl('/sign/in');
              this.toast.success(res.comment[0]);
            } else {
              this.toast.error(res.comment[1]);
            }
          },
          err => {
            this.signUpPending = false;
            this.toast.error('Unknown Error !');
          }
        );
    }
  }
}
