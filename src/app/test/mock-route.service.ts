import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

export class MockActivatedRoute<TParams = Record<string, unknown>> extends ActivatedRoute {
  constructor(parameters?: Readonly<TParams>) {
    super();
    this.queryParams = of(parameters);
    this.params = of(parameters);
    this.data = of({
      ...parameters,
      pagingParams: {
        page: 10,
        ascending: false,
        predicate: 'id',
      },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.url = of([
      {
        ...parameters,
      },
    ]);
    this.snapshot = {
      queryParams: parameters,
      queryParamMap: convertToParamMap(parameters),
      paramMap: convertToParamMap(parameters),
      params: parameters,
      parent: {
        data: {
          ...parameters,
        },
      },
      data: {
        ...parameters,
        pagingParams: {
          page: 10,
          ascending: false,
          predicate: 'id',
        },
      },
    } as unknown as ActivatedRouteSnapshot;
  }
}

export class MockActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  queryParams = [];
  params = {};
  snapshot = { data: {}, params: {}, paramMap: new Map<string, string>() };

  toString() {
    return 'Mock Activated Route snapshot';
  }
}
