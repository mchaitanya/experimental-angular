import { Component, Input } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { defer } from 'rxjs';

import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HomeComponent } from './home.component';

@Component({
  standalone: true,
  selector: 'app-housing-location',
  template: '<p>{{housingLocation?.city}}</p>',
})
class HousingLocationStubComponent {
  @Input() housingLocation: HousingLocation | undefined;
}

const LOCATION_HYD: HousingLocation = {
  id: 2,
  name: 'Lanco',
  city: 'Hyderabad',
  state: 'TL',
  availableUnits: 10,
  wifi: true,
  laundry: true,
};

const LOCATION_BLR: HousingLocation = {
  id: 1,
  name: 'Sobha',
  city: 'Bangalore',
  state: 'KA',
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

    it('gets housing locations OnInit', fakeAsync(() => {
      expect(component.housingLocations).toEqual([LOCATION_HYD, LOCATION_BLR]);
      expect(component.filteredLocations).toEqual([LOCATION_HYD, LOCATION_BLR]);
    }));

    it('filters housing locations', fakeAsync(() => {
      component.filterResults('hyd');
      expect(component.filteredLocations)
        .withContext('Filter for "hyd"')
        .toEqual([LOCATION_HYD]);

      component.filterResults('banga');
      expect(component.filteredLocations)
        .withContext('Filter for "bang"')
        .toEqual([LOCATION_BLR]);
    }));

    it('resets housing locations when filter is empty', fakeAsync(() => {
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
        imports: [HomeComponent],
        providers: [{ provide: HousingService, useValue: housingServiceSpy }],
      })
        .overrideComponent(HomeComponent, {
          remove: { imports: [HousingLocationComponent] },
          add: { imports: [HousingLocationStubComponent] },
        })
        .compileComponents();

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
    });

    beforeEach(fakeAsync(() => {
      fixture.detectChanges(); // Call ngOnInit().
      tick(); // Flush the observable.
    }));

    it('renders', () => {
      expect(component).toBeDefined();
    });

    it('renders 2 locations OnInit', () => {
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

    it('filters housing locations', () => {
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

    it('resets housing locations when filter is empty', () => {
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

  describe('With ngMocks', () => {
    beforeEach(() =>
      MockBuilder(HomeComponent).mock(HousingService, {
        getAllHousingLocations() {
          return defer(() => Promise.resolve([LOCATION_HYD, LOCATION_BLR]));
        },
      })
    );

    it('renders', () => {
      const fixture = MockRender(HomeComponent);
      expect(fixture.point.componentInstance).toBeDefined();
    });

    it('renders 2 locations OnInit', fakeAsync(() => {
      const fixture = MockRender(HomeComponent);
      tick(); // Allow a tick for getAllHousingLocations to emit.
      fixture.detectChanges();
      // Note: ngMocks.findInstances(HousingLocationComponents) fails for some reason.
      const locationEls = ngMocks.findAll(HousingLocationComponent);
      expect(locationEls).withContext('Location count').toHaveSize(2);
      expect(locationEls[0].componentInstance.housingLocation)
        .withContext('First location is Hyderabad')
        .toEqual(LOCATION_HYD);
      expect(locationEls[1].componentInstance.housingLocation)
        .withContext('Second location is Bangalore')
        .toEqual(LOCATION_BLR);
    }));

    it('filters housing locations', fakeAsync(() => {
      const fixture = MockRender(HomeComponent);
      tick();
      ngMocks.find('input').nativeElement.value = 'hyd';
      ngMocks.click('button');
      fixture.detectChanges();
      const locationEls = ngMocks.findAll(HousingLocationComponent);
      expect(locationEls).withContext('Location count').toHaveSize(1);
      expect(locationEls[0].componentInstance.housingLocation)
        .withContext('Filter matches "Hyderabad"')
        .toEqual(LOCATION_HYD);
    }));
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
