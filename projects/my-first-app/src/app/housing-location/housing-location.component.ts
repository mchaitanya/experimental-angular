import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation; // The exclamation point is called the non-null assertion operator.
}
