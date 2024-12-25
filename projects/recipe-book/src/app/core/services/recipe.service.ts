import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

import { EMPTY_FILTER, Recipe, RecipeFilter } from '@recipe-book/core/models';
import { environment } from '@recipe-book/environments/environment';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipeFilter$: Observable<RecipeFilter>;
  private recipeFilterSubject: BehaviorSubject<RecipeFilter>;

  constructor(private http: HttpClient) {
    this.recipeFilterSubject = new BehaviorSubject<RecipeFilter>(EMPTY_FILTER);
    this.recipeFilter$ = this.recipeFilterSubject.asObservable();
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${BASE_PATH}/recipes`)
      .pipe(catchError(() => of([]))); // Fall back to empty array on error
  }

  public updateRecipeFilter(filter: RecipeFilter) {
    this.recipeFilterSubject.next(filter);
  }
}
