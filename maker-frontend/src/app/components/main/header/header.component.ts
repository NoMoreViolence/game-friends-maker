import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppState, User, SignActions } from '../../../ngrx';
import { Store } from '@ngrx/store';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public user: Observable<User>;

  constructor(private store: Store<AppState>, private router: Router, private toast: ToastrService, private translate: TranslateService) {
    this.user = this.store.select('user');
    this.user.subscribe(userData => {
      console.log(userData);
    });
  }

  public logout = () => {
    this.store.dispatch(new SignActions.Logout(null));
    localStorage.removeItem('token');
    this.router.navigateByUrl('/main');
    this.translate.get('Header.logout').subscribe(comment => this.toast.info(comment));
  }

  public changeLang = (value: HTMLSpanElement) => this.translate.use(value.innerText);

  ngOnInit() {}

  ngAfterViewInit() {}
}
