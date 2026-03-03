import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchControl = new FormControl('');

  // users$ will hold the Observable of search results (array of users).
  // ! means we will initialize it later (in ngOnInit or a method), so it's not null at runtime.
  users$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    debugger;
    this.initializeSearch();
  }

  private initializeSearch() {
    debugger;
    this.users$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Emit initial value (empty string) to load all users or show empty state
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Only emit if value is different from previous
      switchMap((searchText) => {
        if (!searchText) {
          return of([]); // return empty array if no search
        }

        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users`).pipe(
          //Filter locally (simulate search API)

          map((users) =>
            users.filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase())),
          ),
        );
      }),
    );
  }
}
