import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarttablectpComponent } from './carttablectp.component';

describe('CarttablectpComponent', () => {
  let component: CarttablectpComponent;
  let fixture: ComponentFixture<CarttablectpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarttablectpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarttablectpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
