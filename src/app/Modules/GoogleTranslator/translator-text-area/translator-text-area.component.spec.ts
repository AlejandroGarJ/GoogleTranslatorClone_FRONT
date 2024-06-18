import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorTextAreaComponent } from './translator-text-area.component';

describe('TranslatorTextAreaComponent', () => {
  let component: TranslatorTextAreaComponent;
  let fixture: ComponentFixture<TranslatorTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslatorTextAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslatorTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
