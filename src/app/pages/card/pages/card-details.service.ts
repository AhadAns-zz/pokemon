import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICardDetails } from 'src/app/pages/card/pages/card-details.models';

@Injectable({
  providedIn: 'root',
})
export class CardDetailsService {
  private readonly _resourceUrl = 'https://pokeapi.co/api/v2/pokemon';

  public constructor(private readonly _httpClient: HttpClient) {}

  public getPokemonDetails$(id: number): Observable<ICardDetails> {
    return this._httpClient.get<ICardDetails>(`${this._resourceUrl}/${id}`, {
      observe: 'body',
    });
  }
}
