import { Component } from '@angular/core';
import { ClarityIcons, bookIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

import { HomeComponent } from './features/home/home.component';

ClarityIcons.addIcons(bookIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClrIconModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Recipe Book';
}
