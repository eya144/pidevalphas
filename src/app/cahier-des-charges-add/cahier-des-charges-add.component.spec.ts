import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CahierDesChargesAddComponent } from './cahier-des-charges-add.component';

describe('CahierDesChargesAddComponent', () => {
  let component: CahierDesChargesAddComponent;
  let fixture: ComponentFixture<CahierDesChargesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CahierDesChargesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CahierDesChargesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
