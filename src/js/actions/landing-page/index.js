import { get } from 'actions/common/async-action';


export const LANDING_PAGE_REQUEST_START = 'LANDING_PAGE_REQUEST_START';
export const LANDING_PAGE_REQUEST_SUCCESS = 'LANDING_PAGE_REQUEST_SUCCESS';
export const LANDING_PAGE_REQUEST_FAILURE = 'LANDING_PAGE_REQUEST_FAILURE';

export const LANDING_PAGE_API_URL = 'landing-page/';

export const requestLandingPage = get(
  LANDING_PAGE_API_URL, [LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE]
);
