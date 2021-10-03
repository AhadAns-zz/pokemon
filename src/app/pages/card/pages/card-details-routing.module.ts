import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailsComponent } from 'src/app/pages/card/pages/card-details.component';
import { CardDetailsResolver } from 'src/app/pages/card/pages/card-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: CardDetailsComponent,
    resolve: {
      resolvedData: CardDetailsResolver,
    },
  },
];

@NgModule({
  declarations: [CardDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CardDetailsRoutingModule {}
