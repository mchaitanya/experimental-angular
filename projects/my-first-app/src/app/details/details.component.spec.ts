import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { defer } from 'rxjs';

import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { DetailsComponent } from './details.component';

const LOCATION: HousingLocation = {
  id: 2,
  name: 'Lanco',
  city: 'Hyderabad',
  state: 'TL',
  availableUnits: 10,
  wifi: true,
  laundry: false,
};

describe('DetailsComponent', () => {
  let harness: RouterTestingHarness;
  let component: DetailsComponent;
  let page: Page;

  beforeEach(async () => {
    const housingServiceSpy = jasmine.createSpyObj<HousingService>(
      'HousingService',
      {
        getHousingLocationById: defer(() => Promise.resolve(LOCATION)),
      }
    );

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideRouter([{ path: 'details/:id', component: DetailsComponent }]),
        { provide: HousingService, useValue: housingServiceSpy },
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/details/2', DetailsComponent);
    page = new Page(harness);
    harness.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call getHousingLocationById with id from route', () => {
    const housingServiceSpy = harness.routeDebugElement!.injector.get(
      HousingService
    ) as jasmine.SpyObj<HousingService>;
    expect(housingServiceSpy.getHousingLocationById).toHaveBeenCalledOnceWith(
      2
    );
  });

  it('should render listing name', () => {
    expect(page.listingHeading.textContent).toContain('Lanco');
  });

  it('should render listing location', () => {
    expect(page.listingLocation.textContent)
      .withContext('City name')
      .toContain('Hyderabad');
    expect(page.listingLocation.textContent)
      .withContext('State code')
      .toContain('TL');
  });

  it('should render listing units available', () => {
    expect(page.listingUnits.textContent).toContain('10');
  });

  it('should render listing wifi availability', () => {
    expect(page.listingWifi.textContent).toContain('Yes');
  });

  it('should render listing laundry availability', () => {
    expect(page.listingLaundry.textContent).toContain('No');
  });
});

class Page {
  constructor(private harness: RouterTestingHarness) {}

  get listingHeading() {
    return this.query<HTMLElement>('.listing-heading');
  }

  get listingLocation() {
    return this.query<HTMLElement>('.listing-location');
  }

  get listingUnits() {
    return this.query<HTMLElement>('.listing-features__units');
  }

  get listingWifi() {
    return this.query<HTMLElement>('.listing-features__wifi');
  }

  get listingLaundry() {
    return this.query<HTMLElement>('.listing-features__laundry');
  }

  private query<T>(selector: string) {
    return this.harness.routeNativeElement!.querySelector(selector) as T;
  }
}
