import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaPruebaComponent } from './textarea-prueba.component';

describe('TextareaPruebaComponent', () => {
  let component: TextareaPruebaComponent;
  let fixture: ComponentFixture<TextareaPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextareaPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
