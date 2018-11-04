import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, fromEvent, forkJoin } from 'rxjs';
import { first, tap, debounceTime, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AppState, User, SignActions } from 'src/app/ngrx';
import lib from 'src/app/lib';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
  private usernameCheck = false;
  private usernamePending = false;
  private emailCheck = false;
  private emailPending = false;
  // Error: false, success: true
  private nError = true;
  private eError = true;
  private pError = true;
  private rpError = true;
  @ViewChild('name')
  private username: ElementRef<HTMLInputElement>;
  @ViewChild('em')
  private email: ElementRef<HTMLInputElement>;
  @ViewChild('pw')
  private password: ElementRef<HTMLInputElement>;
  @ViewChild('rpw')
  private rpassword: ElementRef<HTMLInputElement>;
  private user: Observable<User>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private http: HttpClient,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    this.user = this.store.select('user');
  }

  ngAfterViewInit() {
    this.user.pipe(first()).subscribe(userData => {
      if (userData.success === true) {
        combineLatest(this.router.navigateByUrl('/main'), this.translate.get('Sign.up.already'), (route, comment) =>
          this.toast.info(comment)
        ).subscribe();
      } else {
        fromEvent(this.username.nativeElement, 'input')
          .pipe(
            tap(x => {
              this.usernameCheck = false;
              this.nError = true;
            }),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.username.nativeElement.value === '') {
              this.nError = true;
            } else {
              this.nError = lib.usernameRegex.test(this.username.nativeElement.value);
            }
          });
        fromEvent(this.email.nativeElement, 'input')
          .pipe(
            tap(x => {
              this.emailCheck = false;
              this.eError = true;
            }),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.email.nativeElement.value === '') {
              this.eError = true;
            } else {
              this.eError = lib.emailRegex.test(this.email.nativeElement.value);
            }
          });
        fromEvent(this.password.nativeElement, 'input')
          .pipe(
            tap(x => (this.pError = true)),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.password.nativeElement.value === '') {
              this.pError = true;
            } else {
              this.pError = lib.passwordRegex.test(this.password.nativeElement.value);
              this.rpError = this.rpassword.nativeElement.value === this.password.nativeElement.value;
            }
          });
        fromEvent(this.rpassword.nativeElement, 'input')
          .pipe(
            tap(x => (this.rpError = true)),
            debounceTime(600)
          )
          .subscribe(data => {
            if (this.rpassword.nativeElement.value === '') {
              this.rpError = true;
            } else {
              this.rpError = this.rpassword.nativeElement.value === this.password.nativeElement.value;
            }
          });
      }
    });
  }

  private doubleCheck = (element: HTMLInputElement, what: string) => {
    if ((what === 'username' && this[`${what}Pending`] === false) || (what === 'email' && this[`${what}Pending`] === false)) {
      this[`${what}Pending`] = true;

      this.http.get(`/api/auth/duplication/${what}?checkvalue=${element.value}`).subscribe(
        res => {
          this[`${what}Pending`] = false;
          this[`${what}Check`] = true;
          this.translate.get('Sign.up.checks').subscribe(comment => this.toast.info(comment));
        },
        err => {
          this[`${what}Pending`] = false;
          this[`${what}Check`] = false;
          this.translate.get('Sign.up.checkf').subscribe(comment => this.toast.error(`${what} ${comment}`));
        }
      );
    } else {
      this.translate.get('Sign.up.checkw').subscribe(comment => this.toast.error(comment));
    }
  }

  private signUp = (username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, rpassword: HTMLInputElement) => {
    if (
      !this.nError ||
      !this.eError ||
      !this.pError ||
      !this.rpError ||
      username.value === '' ||
      email.value === '' ||
      password.value === '' ||
      rpassword.value === '' ||
      !this.usernameCheck ||
      !this.emailCheck
    ) {
      if (!this.usernameCheck || !this.emailCheck) {
        this.translate.get('Sign.up.notchecked').subscribe(comment => this.toast.error(comment));
      } else {
        this.translate.get('Sign.up.notright').subscribe(comment => this.toast.error(comment));
      }
    } else {
      this.store.dispatch(
        new SignActions.SignUp({
          username: username.value,
          email: email.value,
          password: password.value
        })
      );
    }
  }
}
