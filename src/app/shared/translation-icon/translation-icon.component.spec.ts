import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationIconComponent } from './translation-icon.component';

describe('TranslationIconComponent', () => {
  let component: TranslationIconComponent;
  let fixture: ComponentFixture<TranslationIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslationIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
