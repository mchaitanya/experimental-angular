import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClrFormsModule } from '@clr/angular';

@Component({
  selector: 'app-recipe-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ClrFormsModule],
  templateUrl: './recipe-add-edit.component.html',
  styleUrl: './recipe-add-edit.component.scss',
})
export class RecipeAddEditComponent {
  public recipeForm: FormGroup;

  public get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  public get stepsArray() {
    return this.recipeForm.get('steps') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      prepTime: null,
      cookTime: null,
      servings: [null, Validators.required],
      ingredients: this.fb.array(['Ingredient 1', 'Ingredient 2']),
      steps: this.fb.array(['Step 1', 'Step 2']),
    });
  }
}
