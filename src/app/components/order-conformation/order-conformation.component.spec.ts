import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConformationComponent } from './order-conformation.component';

describe('OrderConformationComponent', () => {
  let component: OrderConformationComponent;
  let fixture: ComponentFixture<OrderConformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
