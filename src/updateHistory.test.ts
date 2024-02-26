/**
 * @jest-environment jsdom
 */

jest.mock('./validateWindowRequirements', () => ({
  validateWindowRequirements: jest.fn(),
}));

import { updateHistory } from './updateHistory';
import * as dependencies from './validateWindowRequirements';

describe('updateHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window.history, 'replaceState');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should not update history state if required window properties are not present', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => false);
  
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('foo', 'fooValue');
    updateHistory(urlSearchParams);

    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledTimes(0);
  });

  it('should update history by adding new params', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => true);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('foo', 'fooValue');
    updateHistory(urlSearchParams);
  
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledWith(null, '', 'http://localhost/?foo=fooValue');
  });

  it('should update history with existing params', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => true);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('foo', 'fooValue');
    updateHistory(urlSearchParams);
  
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledWith(null, '', 'http://localhost/?foo=fooValue');

    urlSearchParams.set('foo', 'fooValue');
    updateHistory(urlSearchParams);

    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledTimes(2);
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledWith(null, '', 'http://localhost/?foo=fooValue');
  });

  it('should update history with removing params', () => {
    // @ts-expect-error this is actually a jest mock
    dependencies.validateWindowRequirements.mockImplementation(() => true);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('foo', 'fooValue');
    updateHistory(urlSearchParams);
  
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledTimes(1);
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledWith(null, '', 'http://localhost/?foo=fooValue');

    urlSearchParams.delete('foo');
    updateHistory(urlSearchParams);

    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledTimes(2);
    expect(jest.mocked(window.history.replaceState)).toHaveBeenCalledWith(null, '', 'http://localhost/?');
  });
});
