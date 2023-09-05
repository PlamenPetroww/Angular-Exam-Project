import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOfferComponent } from './current-offer.component';

describe('CurrentOfferComponent', () => {
  let component: CurrentOfferComponent;
  let fixture: ComponentFixture<CurrentOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentOfferComponent]
    });
    fixture = TestBed.createComponent(CurrentOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
