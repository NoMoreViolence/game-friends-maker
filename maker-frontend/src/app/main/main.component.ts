import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { NewUserInfo } from '../ngrx/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public user: Observable<NewUserInfo[]>;
  constructor(private store: Store<AppState>) {
    this.user = this.store.select('users');
  }

  ngOnInit() {}
}
