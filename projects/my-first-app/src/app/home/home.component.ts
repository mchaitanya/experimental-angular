import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  housingLocations: HousingLocation[] = [];
  filteredLocations: HousingLocation[] = [];
  sub: Subscription | undefined;

  constructor(private housingService: HousingService) {}

  ngOnInit() {
    this.sub = this.housingService
      .getAllHousingLocations()
      .subscribe((housingLocations: HousingLocation[]) => {
        this.housingLocations = housingLocations;
        this.filteredLocations = housingLocations;
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocations;
      return;
    }

    this.filteredLocations = this.housingLocations.filter(
      housingLocation =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
