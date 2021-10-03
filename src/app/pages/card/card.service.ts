import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ICardDetails } from 'src/app/pages/card/pages/card-details.models';
import { CardDetailsService } from 'src/app/pages/card/pages/card-details.service';
import { asHttpParams } from 'src/app/shared/functions/as-http-params/as-http-params';
import {
  ConsultationPage,
  IConsultationPage,
} from 'src/app/shared/models/consult/consultation-page.models';
import { IPageQuery } from 'src/app/shared/models/query/page.models';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly _resourceUrl = 'https://pokeapi.co/api/v2/pokemon';

  public constructor(
    private readonly _httpClient: HttpClient,
    private readonly _cardDetailsService: CardDetailsService
  ) {}

  public getPokemon$(
    pageQuery: IPageQuery
  ): Observable<IConsultationPage<ICardDetails>> {
    const params = asHttpParams(pageQuery);
    let count = 0;
    let next = '';
    let previous = '';

    return this._httpClient
      .get<IConsultationPage<ICardDetails>>(`${this._resourceUrl}`, {
        params,
        observe: 'response',
      })
      .pipe(
        tap((resp) => {
          count = resp.body.count;
          next = resp.body.next;
          previous = resp.body.previous;
        }),
        mergeMap((response) => {
          return forkJoin(
            response.body.results.map((result, index) => {
              return this._cardDetailsService.getPokemonDetails$(index + 1);
            })
          );
        }),
        map((response): IConsultationPage<ICardDetails> => {
          console.log('response', response);
          return ConsultationPage.create<ICardDetails>({
            results: response,
            offset: pageQuery.offset,
            limit: pageQuery.limit,
            count,
            next,
            previous,
          });
        })
      );

    // return this._httpClient
    //   .get<IConsultationPage<ICard>>(`${this._resourceUrl}`, {
    //     params,
    //     observe: 'response',
    //   })
    //   .pipe(
    //     map((response): IConsultationPage<ICard> => {
    //       const consultPage: IConsultationPage<ICard> = response.body;
    //       const r = consultPage.results.map((result, index) => {
    //       //   return this._cardDetailsService
    //       //     .getPokemonDetails$(index + 1)
    //       //     .pipe(map((pokemonDetails) => (result.details = pokemonDetails))).;
    //       // });
    //       // console.log('r', r);
    //       return ConsultationPage.create<ICard>({
    //         results: consultPage.results,
    //         offset: pageQuery.offset,
    //         limit: pageQuery.limit,
    //         count: consultPage.count,
    //         next: consultPage.next,
    //         previous: consultPage.previous,
    //       });
    //     })
    //   );
  }
}
