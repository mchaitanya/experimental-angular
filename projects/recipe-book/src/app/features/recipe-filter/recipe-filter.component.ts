import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';

import { EMPTY_FILTER, RecipeFilter } from '@recipe-book/core/models';
import { RecipeService } from '@recipe-book/core/services';

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [ReactiveFormsModule, ClrFormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss',
})
export class RecipeFilterComponent {
  public filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.filterForm = this.fb.group<RecipeFilter>(EMPTY_FILTER);
  }

  public isEmpty(): boolean {
    return Object.entries(EMPTY_FILTER).every(
      ([key, value]) => this.filterForm.value[key] === value
    );
  }

  public onFilter() {
    this.recipeService.updateRecipeFilter(this.filterForm.value);
  }

  public onClear() {
    this.filterForm.reset(EMPTY_FILTER);
    this.onFilter();
  }
}
