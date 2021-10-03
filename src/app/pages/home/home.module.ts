import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from 'src/app/pages/home/home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
