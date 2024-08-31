import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityIcons, bookIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

ClarityIcons.addIcons(bookIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ClrIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Recipe Book';
}
