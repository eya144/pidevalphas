import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentChatComponent } from './document-chat.component';

describe('DocumentChatComponent', () => {
  let component: DocumentChatComponent;
  let fixture: ComponentFixture<DocumentChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentChatComponent]
    });
    fixture = TestBed.createComponent(DocumentChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
