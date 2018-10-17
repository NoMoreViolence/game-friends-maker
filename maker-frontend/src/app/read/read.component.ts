import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PersonModel } from './../ngrx/models';
import { PersonActions } from '../ngrx/actions';
import { AppState } from './../app.state';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  private persons: Observable<PersonModel[]>;

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.persons = store.select('persons');
    // store.select('persons').subscribe(value => console.log(value));
    // store.select('prer').subscribe(value => console.log(value));
  }

  public deletePerson(index: number) {
    this.store.dispatch(new PersonActions.DeletePerson(index));
  }

  public httpTest() {
    this.http.post('/api/auth/register', {}).subscribe(success => console.log(success), failure => console.log(failure));
  }

  ngOnInit() {}
}
