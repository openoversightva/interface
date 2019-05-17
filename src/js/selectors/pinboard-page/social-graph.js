import { createSelector } from 'reselect';

import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';
import { getPinboardID } from 'utils/location';

const getOfficers = state => state.pinboardPage.graphData['officers'] || [];
const getCoaccusedData = state => state.pinboardPage.graphData['coaccused_data'] || [];
const getListEvent = state => state.pinboardPage.graphData['list_event'] || [];
export const expandedLinkSelector = (url) => `/social-graph/?pinboard_id=${getPinboardID(url)}`;

const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officerTransform)
);

const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

export const graphDataSelector = (state) => {
  return {
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
  };
};
