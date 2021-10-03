import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICardDetails } from 'src/app/pages/card/pages/card-details.models';
import { CardDetailsService } from 'src/app/pages/card/pages/card-details.service';

@Injectable({ providedIn: 'root' })
export class CardDetailsResolver implements Resolve<ICardDetails> {
  public constructor(private readonly _cardDetailsService: CardDetailsService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ICardDetails> {
    const { id } = route.params;
    return this._cardDetailsService.getPokemonDetails$(id).pipe(
      catchError((): Observable<never> => {
        return EMPTY;
      })
    );
  }
}
