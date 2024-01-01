import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HousingLocation } from '../housing-location';
import { HousingLocationComponent } from './housing-location.component';

describe('HousingLocationComponent', () => {
  let fixture: ComponentFixture<HousingLocationComponent>;
  let component: HousingLocationComponent;
  let expectedLocation: HousingLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HousingLocationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HousingLocationComponent);

    // Stub the housing location supplied by the parent.
    expectedLocation = {
      id: 10,
      name: 'Mirador',
      city: 'Irvine',
      state: 'CA',
      photo: 'http://mirador.com/image',
      availableUnits: 100,
      wifi: true,
      laundry: true,
    };

    component = fixture.componentInstance;
    // Simulate parent setting the input property.
    component.housingLocation = expectedLocation;
    // Trigger initial data binding.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render listing name', () => {
    const headingEl: HTMLElement =
      fixture.nativeElement.querySelector('.listing-heading')!;
    expect(headingEl.textContent).toContain('Mirador');
  });

  it('should render listing location', () => {
    const locationEl: HTMLElement =
      fixture.nativeElement.querySelector('.listing-location')!;
    expect(locationEl.textContent).toContain('Irvine');
    expect(locationEl.textContent).toContain('CA');
  });

  it('should render listing photo', () => {
    const photoEl: HTMLImageElement =
      fixture.nativeElement.querySelector('.listing-photo')!;
    expect(photoEl.src).toBe('http://mirador.com/image');
  });

  it('should render detail link', () => {
    const linkDe = fixture.debugElement.query(By.directive(RouterLink));
    const routerLink = linkDe.injector.get(RouterLink);
    expect(linkDe.nativeElement.textContent).toContain('Learn more');
    expect(routerLink.href).toBe('/details/10');
  });

  it('should route to detail page', fakeAsync(() => {
    const linkDe = fixture.debugElement.query(By.directive(RouterLink));
    const router = TestBed.inject(Router);
    router.resetConfig([{ path: '**', children: [] }]);
    linkDe.triggerEventHandler('click', { button: 0 });
    tick();
    expect(router.url).toBe('/details/10');
  }));
});
