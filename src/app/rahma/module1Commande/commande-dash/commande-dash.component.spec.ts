import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeDashComponent } from './commande-dash.component';

describe('CommandeDashComponent', () => {
  let component: CommandeDashComponent;
  let fixture: ComponentFixture<CommandeDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeDashComponent]
    });
    fixture = TestBed.createComponent(CommandeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
