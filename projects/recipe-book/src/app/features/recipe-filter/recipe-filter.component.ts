import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';

import { RecipeFilter } from '@recipe-book/core/models';

const EMPTY_FILTER: RecipeFilter = {
  keyword: '',
  maxPrepTime: null,
};

@Component({
  selector: 'app-recipe-filter',
  standalone: true,
  imports: [ReactiveFormsModule, ClrFormsModule],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.scss',
})
export class RecipeFilterComponent {
  public filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group<RecipeFilter>(EMPTY_FILTER);
  }

  public isEmpty(): boolean {
    return Object.entries(EMPTY_FILTER).every(
      ([key, value]) => this.filterForm.value[key] === value
    );
  }

  public onFilter() {
    console.log('Apply filter', this.filterForm.value);
  }

  public onClear() {
    this.filterForm.reset(EMPTY_FILTER);
  }
}
