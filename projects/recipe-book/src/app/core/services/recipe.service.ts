import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Recipe } from '@recipe-book/core/models';
import { environment } from '@recipe-book/environments/environment';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${BASE_PATH}/recipes`)
      .pipe(catchError(() => of([]))); // Fall back to empty array on error
  }
}
