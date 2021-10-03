import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardDetailsRoutingModule } from 'src/app/pages/card/pages/card-details-routing.module';

@NgModule({
  imports: [CommonModule, CardDetailsRoutingModule],
})
export class CardDetailsModule {}
