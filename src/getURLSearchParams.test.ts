/**
 * @jest-environment jsdom
 */

jest.mock('./validateWindowRequirements', () => ({
  validateWindowRequirements: jest.fn(),
}));

import { getURLSearchParams } from './getURLSearchParams';
import * as dependencies from './validateWindowRequirements';

describe('getURLSearchParams', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-expect-error necessary to mock window object
    window.location = { search: '' };
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return undefined if required window properties are not present', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => false);

    const result = getURLSearchParams();

    expect(result).toEqual(undefined);
  });

  it('should return URLSearchParams for an empty search', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => true);

    const result = getURLSearchParams();

    expect(result?.toString()).toEqual('');
  });

  it('should return URLSearchParams for a populated search', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => true);

    window.history.replaceState(null, '', 'http://localhost/?foo=fooValue');

    const result = getURLSearchParams();

    expect(result?.toString()).toEqual('foo=fooValue');
  });
});