import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandersystemComponent } from './recommandersystem.component';

describe('RecommandersystemComponent', () => {
  let component: RecommandersystemComponent;
  let fixture: ComponentFixture<RecommandersystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommandersystemComponent]
    });
    fixture = TestBed.createComponent(RecommandersystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
