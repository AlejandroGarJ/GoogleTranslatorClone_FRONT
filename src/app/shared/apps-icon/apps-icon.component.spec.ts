import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsIconComponent } from './apps-icon.component';

describe('AppsIconComponent', () => {
  let component: AppsIconComponent;
  let fixture: ComponentFixture<AppsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
