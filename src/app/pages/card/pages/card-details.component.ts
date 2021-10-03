import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICardDetails } from 'src/app/pages/card/pages/card-details.models';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  public pokemon: ICardDetails = undefined;
  public constructor(private readonly _activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    const data = this._activatedRoute.snapshot.data.resolvedData;
    console.log('data', data);
    this.pokemon = data;
  }

  public trackBy(index: number): number {
    return index;
  }
}
