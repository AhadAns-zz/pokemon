import { ParamMap, Params } from '@angular/router';

const ONE_VALUE = 1;
const FIRST_VALUE = 0;

/**
 * @param paramMap
 * @param key
 */
function getParamValue(paramMap: Readonly<ParamMap>, key: Readonly<string>): string[] | string {
  const values: string[] = paramMap.getAll(key);

  if (values.length === ONE_VALUE) {
    return values[FIRST_VALUE];
  }

  return values;
}

/**
 * @description
 * Parse a param map from the router to an object
 *
 * @param {Readonly<ParamMap>} paramMap The param map from the router
 *
 * @returns {Params} an object containing the params
 */
export function routerParamMapToParams(paramMap: Readonly<ParamMap>): Params {
  return paramMap.keys.reduce((allParams: Readonly<Params>, key: Readonly<string>): Params => {
    return {
      ...allParams,
      [key]: getParamValue(paramMap, key),
    };
  }, {});
}
