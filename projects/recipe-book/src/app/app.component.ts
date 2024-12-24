import { Component } from '@angular/core';
import { ClarityIcons, bookIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

import { RecipeFilterComponent } from './features/recipe-filter/recipe-filter.component';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component';

ClarityIcons.addIcons(bookIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClrIconModule, RecipeListComponent, RecipeFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Recipe Book';
}
