import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatistiquesComponent } from './project-statistiques.component';

describe('ProjectStatistiquesComponent', () => {
  let component: ProjectStatistiquesComponent;
  let fixture: ComponentFixture<ProjectStatistiquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectStatistiquesComponent]
    });
    fixture = TestBed.createComponent(ProjectStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
