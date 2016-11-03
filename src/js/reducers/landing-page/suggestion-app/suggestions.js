import { handleActions } from 'redux-actions';
import { map, reduce } from 'lodash';

import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/landing-page/suggestion';


const SUGGESTION_MAP = ['neighborhoods', 'officer_badge_number', 'officer_name'];

export default handleActions({
  [SUGGESTION_REQUEST_START]: (state, action) => ([]),
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => reduce(
      map(SUGGESTION_MAP, (contentType) => (action.payload[contentType])),
      (memo, suggestion) => (
        memo.concat(suggestion[0].options)
      ), []),
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => ([])
}, []);
