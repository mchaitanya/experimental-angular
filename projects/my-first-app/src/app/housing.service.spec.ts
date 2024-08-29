import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { HousingLocation } from './housing-location';
import { HousingService } from './housing.service';

const LOCATION: HousingLocation = {
  id: 1,
  name: 'Acme',
  city: 'NYC',
  state: 'NY',
  availableUnits: 1,
  wifi: true,
  laundry: true,
};

describe('HousingService', () => {
  let httpTesting: HttpTestingController;
  let housingService: HousingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HousingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    housingService = TestBed.inject(HousingService);
  });

  afterEach(() => {
    // Assert no other requests were made.
    httpTesting.verify();
  });

  it('#getAllHousingLocations should return housing locations.', async () => {
    const housingLocation$ = housingService.getAllHousingLocations();
    // Convert the observable to a promise. This also subscribes to the observable, making the HTTP request.
    const housingLocations = firstValueFrom(housingLocation$);

    // Assert the request was made with the HttpTestingController. The request is pending at this stage.
    const req = httpTesting.expectOne(
      'http://localhost:3000/locations',
      'Request to get housing locations'
    );
    expect(req.request.method).withContext('Request method').toBe('GET');

    // Flush the request, causing it to complete.
    req.flush([LOCATION]);
    await expectAsync(housingLocations)
      .withContext('Data fetched')
      .toBeResolvedTo([LOCATION]);
  });

  it('#getHousingLocationById should return housing location with given id.', async () => {
    const housingLocation = firstValueFrom(
      housingService.getHousingLocationById(1)
    );

    const req = httpTesting.expectOne(
      'http://localhost:3000/locations/1',
      'Request to get housing location with id 1'
    );
    expect(req.request.method).withContext('Request method').toBe('GET');

    req.flush(LOCATION);
    await expectAsync(housingLocation)
      .withContext('Data fetched')
      .toBeResolvedTo(LOCATION);
  });
});
