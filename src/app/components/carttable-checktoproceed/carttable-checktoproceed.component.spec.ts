import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarttableChecktoproceedComponent } from './carttable-checktoproceed.component';

describe('CarttableChecktoproceedComponent', () => {
  let component: CarttableChecktoproceedComponent;
  let fixture: ComponentFixture<CarttableChecktoproceedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarttableChecktoproceedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarttableChecktoproceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
