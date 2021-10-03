import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from 'src/app/pages/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  {
    path: '',
    component: CardComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./pages/card-details.module').then((m) => m.CardDetailsModule),
  },
];

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatPaginatorModule,
  ],
})
export class CardRoutingModule {}
