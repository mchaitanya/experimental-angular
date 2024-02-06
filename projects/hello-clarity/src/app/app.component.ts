import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import '@cds/core/icon/register.js';
import { ClarityIcons, vmBugIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

ClarityIcons.addIcons(vmBugIcon);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ClrIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Clarity';
}
