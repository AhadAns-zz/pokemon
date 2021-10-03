import { Params } from '@angular/router';

export interface IPageQuery extends Params {
  offset: number;
  limit: number;
}

export const FIRST_PAGE_INDEX = 0;

export const ITEMS_PER_PAGE = 20;
