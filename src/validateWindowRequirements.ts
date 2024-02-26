/**
 * We assume that child properties of history and location work as expected,
 * as these are first class members of JS in a browser environment.
 * 
 * We are assuming the check for window will suffice as a sufficient check
 * for this function not running in a browser.
 */
export const validateWindowRequirements = () => {
  if (typeof window === 'undefined' || !window) return false;

  const historyExists = typeof window.history !== 'undefined' && !!window.history;
  const locationExists = typeof window.location !== 'undefined' && !!window.location;
  const urlSearchParamsExists = typeof window.URLSearchParams !== 'undefined' && !!URLSearchParams;

  return historyExists && locationExists && urlSearchParamsExists;
};
