import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClarityIcons, plusIcon, timesIcon } from '@cds/core/icon';
import { ClrFormsModule, ClrIconModule } from '@clr/angular';

ClarityIcons.addIcons(plusIcon, timesIcon);

@Component({
  selector: 'app-recipe-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ClrFormsModule, ClrIconModule],
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
      title: ['Title', Validators.required],
      imageUrl: ['http://cloud.store/recipe.jpg', Validators.required],
      prepTime: null,
      cookTime: null,
      servings: [2, [Validators.required, Validators.min(1)]],
      ingredients: this.fb.array(['Ingredient 1'], Validators.required),
      steps: this.fb.array(['Step 1', 'Step 2'], Validators.required),
    });
  }

  public addControl(formArray: FormArray) {
    formArray.push(this.fb.control('', Validators.required));
  }

  public removeControl(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }
}
