import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { HousingLocation } from './housing-location';
import { HousingService } from './housing.service';

const LOCATION: HousingLocation = {
  id: 1,
  name: 'Acme',
  city: 'NYC',
  state: 'NY',
  photo: 'http://image/url',
  availableUnits: 1,
  wifi: true,
  laundry: true,
};

describe('HousingService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let housingService: HousingService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    housingService = new HousingService(httpClientSpy);
  });

  it('#getAllHousingLocations should return housing locations.', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([LOCATION]));

    housingService.getAllHousingLocations().subscribe({
      next: housingLocations => {
        expect(housingLocations).toEqual([LOCATION]);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(
      'http://localhost:3000/locations'
    );
  });

  it('#getHousingLocationById should return housing location with given id.', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(LOCATION));

    housingService.getHousingLocationById(1).subscribe({
      next: housingLocation => {
        expect(housingLocation).toEqual(LOCATION);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(
      'http://localhost:3000/locations/1'
    );
  });
});
