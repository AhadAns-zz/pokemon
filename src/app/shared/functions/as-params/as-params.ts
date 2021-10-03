import { Params } from '@angular/router';
import { IPageQuery } from '../../models/query/page.models';

/**
 * @param query
 */
export function asParams(query: IPageQuery): Params {
  return new ParamsBuilder().with(query);
}

class ParamsBuilder implements Params {
  public with(query: IPageQuery): ParamsBuilder {
    return this._withAny(query);
  }

  private _withAny(data: any = {}): ParamsBuilder {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
    return this;
  }
}
