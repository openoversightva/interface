import * as _ from 'lodash';
import { createSelector } from 'reselect';

import { generatePinboardUrl } from 'utils/pinboard';


const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return _.get(pinboard, 'officer_ids', []).length +
    _.get(pinboard, 'crids', []).length +
    _.get(pinboard, 'trr_ids', []).length;
};

export const getPinboard = createSelector(
  state => state.pinboardPage.pinboard,
  pinboard => ({
    id: _.get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: _.get(pinboard, 'title', ''),
    officerIds: _.map(_.get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    crids: _.get(pinboard, 'crids', []),
    trrIds: _.map(_.get(pinboard, 'trr_ids', []), (id) => (id.toString())),
    description: _.get(pinboard, 'description', ''),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    isPinboardRestored: _.get(pinboard, 'isPinboardRestored', false),
  })
);

export const pinboardItemsSelector = createSelector(
  getPinboard,
  ({ officerIds, crids, trrIds }) => ({
    'OFFICER': officerIds,
    'CR': crids,
    'TRR': trrIds,
  })
);

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);
