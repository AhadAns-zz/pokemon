import { HttpParams } from '@angular/common/http';
import { IPageQuery } from 'src/app/shared/models/query/page.models';

/**
 * @param pageQuery
 * @param filtersAndSorts
 */
export function asHttpParams(pageQuery: IPageQuery): HttpParams {
  const params: HttpParams = new HttpParams().set('offset', String(pageQuery.offset)).set('limit', String(pageQuery.limit));

  // filtersAndSorts.forEach(item => {
  //   params = params.append(item.type, item.value);
  // });

  return params;
}
