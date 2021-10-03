import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { ICardDetails } from 'src/app/pages/card/pages/card-details.models';
import { IConsultationPage } from 'src/app/shared/models/consult/consultation-page.models';
import { FIRST_PAGE_INDEX, ITEMS_PER_PAGE } from '../../shared/models/query/page.models';
import { CardService } from '../card/card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CardComponent } from './card.component';
import { MockActivatedRoute } from '../../test/mock-route.service';
import { PageEvent } from '@angular/material/paginator';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cardService: CardService;
  let activatedRoute: MockActivatedRoute;
  let router: Router;

  beforeEach(() => {
    activatedRoute = new MockActivatedRoute({
      page: {
        results: [],
        count: 0,
        offset: FIRST_PAGE_INDEX,
        limit: ITEMS_PER_PAGE,
        next: '',
        previous: '',
      } as IConsultationPage<ICardDetails>,
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).overrideTemplate(CardComponent, '');

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cardService = TestBed.inject(CardService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should fetch the pokemons based on the query params', (): void => {
      expect.assertions(2);

      jest.spyOn(cardService, 'getPokemon$').mockReturnValue(of());

      component.ngOnInit();

      expect(component.page.limit).toBe(20);
      expect(component.page.offset).toBe(0);
    });
  });

  describe('pageChanged()', () => {
    let newPageIndex: number;

    let routerNavigateSpy: jest.SpyInstance;

    beforeEach((): void => {
      newPageIndex = 1;

      routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation();
    });

    it('should navigate to the new current page', (): void => {
      expect.assertions(2);

      component.pageChanged({ pageSize: 20, pageIndex: 2 } as PageEvent);

      expect(routerNavigateSpy).toHaveBeenCalledTimes(1);
      expect(routerNavigateSpy).toHaveBeenCalledWith([], {
        queryParams: {
          offset: 40,
          limit: 20,
        },
        relativeTo: activatedRoute,
        replaceUrl: true,
      } as NavigationExtras);
    });
  });

  describe('goToDetails()', () => {
    it('should redirect to the details page', () => {
      expect.assertions(2);

      const routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation();
      component.goToDetails(1);

      expect(routerNavigateSpy).toHaveBeenCalledTimes(1);
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/card/2']);
    });
  });
});
