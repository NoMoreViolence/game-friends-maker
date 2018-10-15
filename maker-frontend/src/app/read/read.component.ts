import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PersonModel } from './../ngrx/models';
import { AppState } from './../app.state';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  private persons: Observable<PersonModel[]>;

  constructor(private store: Store<AppState>) {
    this.persons = store.select('persons');
    // store.select('persons').subscribe(value => console.log(value));
    // store.select('prer').subscribe(value => console.log(value));
  }

  ngOnInit() {}
}
