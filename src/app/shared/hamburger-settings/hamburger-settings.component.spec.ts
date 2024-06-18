import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerSettingsComponent } from './hamburger-settings.component';

describe('HamburgerSettingsComponent', () => {
  let component: HamburgerSettingsComponent;
  let fixture: ComponentFixture<HamburgerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HamburgerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
