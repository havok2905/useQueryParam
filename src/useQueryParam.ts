import { useCallback, useEffect, useState } from 'react';
import { getURLSearchParams } from './getURLSearchParams';
import { updateHistory } from './updateHistory';

export type useQueryParamValues = [string, (newValue: string) => void];

export const useQueryParam = (
  key: string,
  initialValue: string
): useQueryParamValues => {
  const [didLoad, setDidLoad] = useState<boolean>(false);
  const [queryParamValue, setQueryParamValue] = useState<string>(initialValue);

  const updateHistoryWithSearchParams = useCallback((key: string, value: string) => {
    const urlSearchParams = getURLSearchParams();

    if (typeof urlSearchParams !== 'undefined' && urlSearchParams) {
      urlSearchParams.set(key, value);
      updateHistory(urlSearchParams);
    }
  }, []);

  const setQueryParam = useCallback((newValue: string) => {
    updateHistoryWithSearchParams(key, newValue);
    setQueryParamValue(newValue);
  }, []);

  useEffect(() => {
    if (!didLoad) {
      updateHistoryWithSearchParams(key, initialValue);
      setDidLoad(true);
    }
  }, []);

  return [
    queryParamValue,
    setQueryParam
  ];
};
