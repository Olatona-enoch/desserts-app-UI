import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductButtonComponent } from './product-button.component';

describe('ProductButtonComponent', () => {
  let component: ProductButtonComponent;
  let fixture: ComponentFixture<ProductButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductButtonComponent]
    });
    fixture = TestBed.createComponent(ProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
