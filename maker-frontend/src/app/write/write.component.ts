import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { PersonModel } from './../ngrx/models';
import { PersonActions } from './../ngrx/actions';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  public addPerson(name, age) {
    this.store.dispatch(new PersonActions.AddPerson({ name, age }));
  }

  ngOnInit() {}
}
