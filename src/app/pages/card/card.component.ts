import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { AutoUnsubscriber } from 'src/app/shared/classes/auto-unsubscriber';
import {
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  FIRST_PAGE_INDEX,
  IPageQuery,
  ITEMS_PER_PAGE,
} from 'src/app/shared/models/query/page.models';
import { routerParamMapToParams } from 'src/app/shared/functions/router/router-param-map-to-params';
import { isEqual } from 'lodash/index';
import {
  ConsultationPage,
  IConsultationPage,
} from 'src/app/shared/models/consult/consultation-page.models';
import { Observable } from 'rxjs';
import { CardService } from 'src/app/pages/card/card.service';
import { PageEvent } from '@angular/material/paginator';
import { asParams } from 'src/app/shared/functions/as-params/as-params';
import { ICardDetails } from 'src/app/pages/card/pages/card-details.models';

export type CardQueryParamsType = IPageQuery;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends AutoUnsubscriber implements OnInit {
  public constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cardService: CardService
  ) {
    super();
  }

  public page: IConsultationPage<ICardDetails> | undefined = undefined;
  private static _parseQueryParams(
    params: Readonly<ParamMap>
  ): CardQueryParamsType {
    let offset: number = parseInt(params.get('offset'));
    let limit: number = parseInt(params.get('limit'));

    if (!Number.isFinite(offset)) {
      offset = FIRST_PAGE_INDEX;
    }

    if (!Number.isFinite(limit)) {
      limit = ITEMS_PER_PAGE;
    }

    return {
      ...routerParamMapToParams(params),
      offset,
      limit,
    };
  }

  public ngOnInit(): void {
    this._watchQueryParamsChange();
  }

  public pageChanged(event: PageEvent): void {
    const offset = event.pageSize * event.pageIndex;

    const queryParams: Params = asParams({
      offset,
      limit: event.pageSize,
    });
    void this._updateUrlQueryParams(queryParams);
  }

  public goToDetails(index: number): void {
    const id = index + 1;
    void this._router.navigate([`/card/${id}`]);
  }

  public trackBy(index: number): number {
    return index;
  }

  private _watchQueryParamsChange(): void {
    this.registerSubscription(
      this._activatedRoute.queryParamMap
        .pipe(
          map(
            (params: Readonly<ParamMap>): CardQueryParamsType =>
              CardComponent._parseQueryParams(params)
          ),
          distinctUntilChanged(
            (
              oldParams: Readonly<CardQueryParamsType>,
              newParams: Readonly<CardQueryParamsType>
            ): boolean => isEqual(oldParams, newParams)
          ),
          tap({
            next: (params: Readonly<CardQueryParamsType>): void => {
              // The page doesn't exist on the first load
              // We create it and update the query params to display in the browser the pagination data
              if (!this.page) {
                this._setPage(
                  ConsultationPage.create({
                    results: [],
                    count: 0,
                    offset: params.offset,
                    limit: params.limit,
                    next: '',
                    previous: '',
                  })
                );
                void this._updateUrlQueryParams(params, false);
              }

              this.page.offset = params.offset;
              this.page.limit = params.limit;
            },
          }),
          /**
           * @description
           * FYI {@link switchMap} to cancel ongoing HTTP calls when the query change
           */
          switchMap(
            (
              params: Readonly<CardQueryParamsType>
            ): Observable<IConsultationPage<ICardDetails>> =>
              this._loadPage$(params)
          )
        )
        .subscribe()
    );
  }

  private _setPage(page: IConsultationPage<ICardDetails>): void {
    this.page = page;
    console.log('page', this.page);
  }

  private _updateUrlQueryParams(
    queryParams: Readonly<Params>,
    shouldReplaceUrl: Readonly<boolean> = true
  ): Promise<boolean> {
    return this._router.navigate([], {
      queryParams,
      relativeTo: this._activatedRoute,
      replaceUrl: shouldReplaceUrl,
    });
  }

  private _loadPage$(
    params: Readonly<CardQueryParamsType>
  ): Observable<IConsultationPage<ICardDetails>> {
    return this._cardService
      .getPokemon$({
        offset: params.offset,
        limit: params.limit,
      })
      .pipe(
        tap({
          next: (page: Readonly<IConsultationPage<ICardDetails>>): void => {
            this._setPage(page);
          },
          error: (error): void => {
            console.error('error', error);
          },
        }),
        take(1)
      );
  }
}
