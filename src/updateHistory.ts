import { validateWindowRequirements } from './validateWindowRequirements';

export const updateHistory = (urlSearchParams: URLSearchParams) => {
  if (!validateWindowRequirements()) return;

  const hash = window.location.hash;
  const host = window.location.host ?? '';
  const pathname = window.location.pathname ?? '';
  const protocol = window.location.protocol ?? '';
  const search = urlSearchParams?.toString() ?? '';

  const newUrl = `${protocol}//${host}${pathname}?${search}${hash}`;

  window.history.replaceState(null, '', newUrl);
};
