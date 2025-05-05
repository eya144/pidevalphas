import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMaterielComponent } from './top-materiel.component';

describe('TopMaterielComponent', () => {
  let component: TopMaterielComponent;
  let fixture: ComponentFixture<TopMaterielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopMaterielComponent]
    });
    fixture = TestBed.createComponent(TopMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
