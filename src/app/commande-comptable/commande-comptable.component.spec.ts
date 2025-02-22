import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeComptableComponent } from './commande-comptable.component';

describe('CommandeComptableComponent', () => {
  let component: CommandeComptableComponent;
  let fixture: ComponentFixture<CommandeComptableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeComptableComponent]
    });
    fixture = TestBed.createComponent(CommandeComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
