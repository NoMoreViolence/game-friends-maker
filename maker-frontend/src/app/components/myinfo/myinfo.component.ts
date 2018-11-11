import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, User } from 'src/app/store/models';
import { gameReducer } from 'src/app/store/reducer';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss']
})
export class MyinfoComponent implements AfterViewInit, OnDestroy {
  public allGameIds$: Observable<string[] | number[]>;
  public myInfo$: Observable<User>;

  constructor(private store: Store<AppState>) {
    this.myInfo$ = this.store.select(state => state.user);
    this.allGameIds$ = this.store.select(gameReducer.getAllGameIds);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
}
