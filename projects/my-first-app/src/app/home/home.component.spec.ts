import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { defer } from 'rxjs';

import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { HomeComponent } from './home.component';

// Test somehow works without having to import either the real or stub HousingLocationComponent.
// @Component({ standalone: true, selector: 'app-housing-location', template: '' })
// class HousingLocationComponentStub {
//   @Input() housingLocation: HousingLocation | undefined;
// }

const LOCATION_HYD: HousingLocation = {
  id: 2,
  name: 'Lanco',
  city: 'Hyderabad',
  state: 'TL',
  photo: 'http://lanco.com/image',
  availableUnits: 10,
  wifi: true,
  laundry: true,
};

const LOCATION_BLR: HousingLocation = {
  id: 1,
  name: 'Sobha',
  city: 'Bangalore',
  state: 'KA',
  photo: 'http://sobha.com/image',
  availableUnits: 5,
  wifi: true,
  laundry: false,
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let housingServiceSpy: jasmine.SpyObj<HousingService>;

  beforeEach(() => {
    housingServiceSpy = jasmine.createSpyObj<HousingService>('HousingService', {
      // Return an asynchronous observable.
      getAllHousingLocations: defer(() =>
        Promise.resolve([LOCATION_HYD, LOCATION_BLR])
      ),
    });
  });

  describe('Class testing', () => {
    beforeEach(fakeAsync(() => {
      component = new HomeComponent(housingServiceSpy);
      component.ngOnInit();
      tick(); // Flush the observable.
    }));

    it('should get housing locations OnInit', fakeAsync(() => {
      expect(component.housingLocations).toEqual([LOCATION_HYD, LOCATION_BLR]);
      expect(component.filteredLocations).toEqual([LOCATION_HYD, LOCATION_BLR]);
    }));

    it('should filter housing locations', fakeAsync(() => {
      component.filterResults('hyd');
      expect(component.filteredLocations)
        .withContext('Filter for "hyd"')
        .toEqual([LOCATION_HYD]);

      component.filterResults('banga');
      expect(component.filteredLocations)
        .withContext('Filter for "bang"')
        .toEqual([LOCATION_BLR]);
    }));

    it('should reset housing locations when filter is empty', fakeAsync(() => {
      component.filterResults('hyd');
      expect(component.filteredLocations)
        .withContext('Filter for "hyd"')
        .toEqual([LOCATION_HYD]);

      component.filterResults('');
      expect(component.filteredLocations)
        .withContext('Filter empty')
        .toEqual([LOCATION_HYD, LOCATION_BLR]);
    }));
  });

  describe('DOM testing', () => {
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        // Without the RouterTestingModule, the test fails because it can't find a provider for ActivatedRoute.
        imports: [HomeComponent, RouterTestingModule],
        providers: [{ provide: HousingService, useValue: housingServiceSpy }],
      }).compileComponents();

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    });

    beforeEach(fakeAsync(() => {
      fixture.detectChanges(); // Call ngOnInit().
      tick(); // Flush the observable.
    }));

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should render 2 locations OnInit', () => {
      fixture.detectChanges(); // Update the bindings.
      const locationEls = queryLocationElements(fixture);
      expect(locationEls).withContext('Location count').toHaveSize(2);
      expect(locationEls[0].textContent)
        .withContext('First location is Hyderabad')
        .toContain('Hyderabad');
      expect(locationEls[1].textContent)
        .withContext('Second location is Bangalore')
        .toContain('Bangalore');
    });

    it('should filter housing locations', () => {
      const { inputEl, buttonEl } = queryFilterElements(fixture);
      inputEl.value = 'hyd';
      buttonEl.click();
      fixture.detectChanges();

      const locationEls = queryLocationElements(fixture);
      expect(locationEls).withContext('Location count').toHaveSize(1);
      expect(locationEls[0].textContent)
        .withContext('Filter matches "Hyderabad"')
        .toContain('Hyderabad');
    });

    it('should reset housing locations when filter is empty', () => {
      const { inputEl, buttonEl } = queryFilterElements(fixture);
      inputEl.value = 'hyd';
      buttonEl.click();
      fixture.detectChanges();
      const locationsAfterFilter = queryLocationElements(fixture);
      expect(locationsAfterFilter)
        .withContext('One location after filter')
        .toHaveSize(1);

      inputEl.value = '';
      buttonEl.click();
      fixture.detectChanges();
      const locationsAfterReset = queryLocationElements(fixture);
      expect(locationsAfterReset)
        .withContext('Two locations after reset')
        .toHaveSize(2);
    });
  });
});

function queryLocationElements(fixture: ComponentFixture<HomeComponent>) {
  return fixture.nativeElement.querySelectorAll('app-housing-location');
}

function queryFilterElements(fixture: ComponentFixture<HomeComponent>) {
  const inputEl: HTMLInputElement =
    fixture.nativeElement.querySelector('input')!;
  const buttonEl: HTMLButtonElement =
    fixture.nativeElement.querySelector('button')!;
  return { inputEl, buttonEl };
}
