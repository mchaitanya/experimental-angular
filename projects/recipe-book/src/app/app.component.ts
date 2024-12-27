import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ClarityIcons, bookIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

ClarityIcons.addIcons(bookIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClrIconModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Recipe Book';
}
