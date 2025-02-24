import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectorComponentComponent } from './map-selector-component.component';

describe('MapSelectorComponentComponent', () => {
  let component: MapSelectorComponentComponent;
  let fixture: ComponentFixture<MapSelectorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapSelectorComponentComponent]
    });
    fixture = TestBed.createComponent(MapSelectorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
