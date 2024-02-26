/**
 * @jest-environment jsdom
 */

import { act, renderHook, waitFor } from '@testing-library/react';
import { useQueryParam } from './useQueryParam';

describe('useQueryParam', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', 'http://localhost/');
  });

  afterAll(() => {
    window.history.replaceState(null, '', 'http://localhost/');
  });

  it('should return empty default values', async () => {
    const { result } = renderHook(() => useQueryParam('foo', ''));
    const [queryParamValue, setQueryParam] = result.current;

    await waitFor(() => {
      expect(queryParamValue).toEqual('');
      expect(window.location.search).toEqual('?foo=');
      expect(typeof setQueryParam).toEqual('function');
    });
  });

  it('should set and return default values', async () => {
    const { result } = renderHook(() => useQueryParam('foo', 'bar'));
    const [queryParamValue, setQueryParam] = result.current;

    await waitFor(() => {
      expect(queryParamValue).toEqual('bar');
      expect(window.location.search).toEqual('?foo=bar');
      expect(typeof setQueryParam).toEqual('function');
    });
  });

  it('should update search', async () => {
    const { result } = renderHook(() => useQueryParam('foo', 'bar'));
    const [, setQueryParam] = result.current;

    act(() => {
      setQueryParam('baz');
    });

    await waitFor(() => {
      const [queryParamValue] = result.current;
      expect(window.location.search).toEqual('?foo=baz');
      expect(queryParamValue).toEqual('baz');
    });
  });

  it('should update value, but not update search if window requirements are not met', async () => {
    // @ts-expect-error necessary to mock window object
    window.URLSearchParams = undefined;

    const { result } = renderHook(() => useQueryParam('foo', 'bar'));
    const [, setQueryParam] = result.current;

    act(() => {
      setQueryParam('baz');
    });

    await waitFor(() => {
      const [queryParamValue] = result.current;
      expect(window.location.search).toEqual('');
      expect(queryParamValue).toEqual('baz');
    });
  });
});