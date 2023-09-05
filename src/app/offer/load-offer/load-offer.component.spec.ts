import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadOfferComponent } from './load-offer.component';

describe('LoadOfferComponent', () => {
  let component: LoadOfferComponent;
  let fixture: ComponentFixture<LoadOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadOfferComponent]
    });
    fixture = TestBed.createComponent(LoadOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
