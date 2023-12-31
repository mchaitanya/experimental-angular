import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { YesNoPipe } from '../yes-no.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, YesNoPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  housingLocation: HousingLocation | undefined;
  sub: Subscription | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.sub = this.housingService
      .getHousingLocationById(housingLocationId)
      .subscribe(housingLocation => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '', // Default to empty string with the nullish coalescing operator.
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
