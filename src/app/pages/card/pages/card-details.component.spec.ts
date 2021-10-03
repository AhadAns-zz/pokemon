import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../../test/mock-route.service';

import { CardDetailsComponent } from './card-details.component';

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;
  let activatedRoute: MockActivatedRoute;

  beforeEach(() => {
    activatedRoute = new MockActivatedRoute({ resolvedData: null });
    TestBed.configureTestingModule({
      declarations: [CardDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).overrideTemplate(CardDetailsComponent, '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
