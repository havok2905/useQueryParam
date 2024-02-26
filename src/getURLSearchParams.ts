import { validateWindowRequirements } from './validateWindowRequirements';

export const getURLSearchParams = (): URLSearchParams | undefined => {
  if (!validateWindowRequirements()) return;

  const queryString = window.location.search ?? '';

  return new URLSearchParams(queryString);
};
