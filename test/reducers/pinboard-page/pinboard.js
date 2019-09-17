import should from 'should';

import pinboardReducer from 'reducers/pinboard-page/pinboard';
import * as constants from 'utils/constants';


describe('Pinboard reducer', function () {
  it('should have initial state', function () {
    should(pinboardReducer(undefined, {})).eql({
      'id': null,
      'title': '',
      'officer_ids': [],
      'crids': [],
      'trr_ids': [],
      'description': '',
      'saving': false,
      'isPinboardRestored': false,
    });
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
        saving: true,
        isPinboardRestored: false,
      },
      {
        type: constants.PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: '66ef1560',
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: [],
      'trr_ids': [],
      saving: false,
      isPinboardRestored: true,
    });
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS to remove not found items', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [0, 1, 2, 3],
        crids: ['abc123', 'xyz567'],
        'trr_ids': [3, 4, 2, 1, 5],
        saving: true,
        isPinboardRestored: false,
      },
      {
        type: constants.PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: '66ef1560',
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc123'],
          'trr_ids': [2],
          'not_found_items': {
            'officer_ids': [0, 2, 88],
            crids: ['xyz567', 'tyu890'],
            'trr_ids': [1, 3, 99],
          },
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [1, 3],
      crids: ['abc123'],
      'trr_ids': [4, 2, 5],
      saving: false,
      isPinboardRestored: true,
    });
  });

  it('should handle PINBOARD_CREATE_REQUEST_FAILURE', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
        saving: true,
      },
      {
        type: constants.PINBOARD_CREATE_REQUEST_FAILURE,
        payload: {},
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: [],
      'trr_ids': [],
      saving: false,
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        'id': '66ef1560',
        'title': '',
        'officer_ids': [],
        'crids': [],
        'trr_ids': [],
        'description': '',
        'saving': true,
        'isPinboardRestored': false,
      },
      {
        type: constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
        payload: {
          id: '66ef1560',
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
          'example_pinboards': [{
            id: '66ef1561',
            title: 'Pinboard 1',
            description: 'Description 1',
          }, {
            id: '66ef1562',
            title: 'Pinboard 2',
            description: 'Description 2',
          }],
        },
      }
    ).should.deepEqual({
      'id': '66ef1560',
      'title': '',
      'officer_ids': [],
      'crids': [],
      'trr_ids': [],
      'description': '',
      'saving': false,
      'isPinboardRestored': false,
      'example_pinboards': [{
        id: '66ef1561',
        title: 'Pinboard 1',
        description: 'Description 1',
      }, {
        id: '66ef1562',
        title: 'Pinboard 2',
        description: 'Description 2',
      }],
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_FAILURE', function () {
    pinboardReducer(
      {
        'id': '66ef1560',
        'title': '',
        'officer_ids': [],
        'crids': [],
        'trr_ids': [],
        'description': '',
        'saving': true,
        'isPinboardRestored': false,
      },
      {
        type: constants.PINBOARD_UPDATE_REQUEST_FAILURE,
        payload: {},
      }
    ).should.deepEqual({
      'id': '66ef1560',
      'title': '',
      'officer_ids': [],
      'crids': [],
      'trr_ids': [],
      'description': '',
      'saving': false,
      'isPinboardRestored': false,
    });
  });

  it('should handle PINBOARD_CREATE_REQUEST_START', function () {
    pinboardReducer(
      {
        'id': null,
        'officer_ids': [],
        crids: [],
        'trr_ids': [],
        'saving': false,
      },
      {
        type: constants.PINBOARD_CREATE_REQUEST_START,
        payload: {
          request: {
            method: 'post',
            url: 'http://api.cpdp.co/api/v2/pinboards/',
            data: {
              title: 'Title',
              description: 'Description',
              'officer_ids': [1],
              crids: ['abc'],
              'trr_ids': [1],
            },
          },
        },
      }
    ).should.deepEqual({
      'id': null,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
      'saving': true,
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_START', function () {
    pinboardReducer(
      {
        'id': '66ef1560',
        'saving': false,
      },
      {
        type: constants.PINBOARD_UPDATE_REQUEST_START,
        payload: {
          id: '66ef1560',
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        },
      }
    ).should.deepEqual({
      'id': '66ef1560',
      'saving': true,
    });
  });

  it('should handle PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: null,
        title: '',
        description: '',
        'officer_ids': [],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.PINBOARD_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '66ef1560',
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
    });
  });

  it('should handle PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {},
      {
        type: constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
        payload: {
          id: '66ef1560',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      isPinboardRestored: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE with type is OFFICER', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          type: 'OFFICER',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2, 1],
      crids: [],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE with type is OFFICER but officer id is duplicated', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2, 1, 3],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          type: 'OFFICER',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2, 1, 3],
      crids: [],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE with type is CR', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          type: 'CR',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: ['1'],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE with type is CR but crid is duplicated', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2, 1, 3],
        crids: ['2', '1'],
        'trr_ids': [],
      },
      {
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          type: 'CR',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2, 1, 3],
      crids: ['2', '1'],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE with type is TRR', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          type: 'TRR',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: [],
      'trr_ids': [1],
      needRefreshData: true,
    });
  });

  it('should handle ADD_ITEM_TO_PINBOARD_STATE with type is TRR but trr id is duplicated', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [4, 5],
        crids: [],
        'trr_ids': [2, 1, 3],
      },
      {
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          type: 'TRR',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [4, 5],
      crids: [],
      'trr_ids': [2, 1, 3],
      needRefreshData: true,
    });
  });


  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with type is OFFICER', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [1, 2],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'OFFICER',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: [],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with type is OFFICER but officer id does not exist', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2, 1, 3],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'OFFICER',
          id: '5',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2, 1, 3],
      crids: [],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with type is CR', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: ['1', '3', '2'],
        'trr_ids': [],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'CR',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: ['3', '2'],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with type is CR but crid does not exist', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2, 1, 3],
        crids: ['2', '1'],
        'trr_ids': [],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'CR',
          id: '5',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2, 1, 3],
      crids: ['2', '1'],
      'trr_ids': [],
      needRefreshData: true,
    });
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with type is TRR', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [7, 1, 8],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'TRR',
          id: '1',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [2],
      crids: [],
      'trr_ids': [7, 8],
      needRefreshData: true,
    });
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with type is TRR but trr id does not exist', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [4, 5],
        crids: [],
        'trr_ids': [2, 1, 3],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'TRR',
          id: '7',
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [4, 5],
      crids: [],
      'trr_ids': [2, 1, 3],
      needRefreshData: true,
    });
  });

  it('should handle REMOVE_ITEM_FROM_PINBOARD_STATE with STATE_ONLY mode', function () {
    pinboardReducer(
      {
        id: '66ef1560',
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [4, 5],
        crids: [],
        'trr_ids': [2, 1, 3],
      },
      {
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          type: 'TRR',
          id: '7',
          mode: constants.PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
        },
      }
    ).should.deepEqual({
      id: '66ef1560',
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [4, 5],
      crids: [],
      'trr_ids': [2, 1, 3],
      needRefreshData: false,
    });
  });

  it('should handle ORDER_PINBOARD_STATE with type is OFFICER', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2, 3, 4],
        crids: [],
        'trr_ids': [],
      },
      {
        type: constants.ORDER_PINBOARD_STATE,
        payload: {
          type: 'OFFICER',
          ids: ['4', '3', '2'],
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [4, 3, 2],
      crids: [],
      'trr_ids': [],
    });
  });

  it('should handle ORDER_PINBOARD_STATE with type is CR', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [0, 1, 2, 3, 4],
        crids: ['2', '3', '4'],
        'trr_ids': [],
      },
      {
        type: constants.ORDER_PINBOARD_STATE,
        payload: {
          type: 'CR',
          ids: ['4', '3', '2'],
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [0, 1, 2, 3, 4],
      crids: ['4', '3', '2'],
      'trr_ids': [],
    });
  });

  it('should handle ORDER_PINBOARD_STATE with type is TRR', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [10, 11, 12, 13, 14],
        crids: [],
        'trr_ids': [1, 2, 3, 4],
      },
      {
        type: constants.ORDER_PINBOARD_STATE,
        payload: {
          type: 'TRR',
          ids: ['4', '3', '2', '1'],
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title 2',
      description: 'Description 2',
      'officer_ids': [10, 11, 12, 13, 14],
      crids: [],
      'trr_ids': [4, 3, 2, 1],
    });
  });

  it('should handle UPDATE_PINBOARD_INFO_STATE', function () {
    pinboardReducer(
      {
        id: null,
        title: 'Title',
        description: 'Description',
        'officer_ids': [10, 11, 12, 13, 14],
        crids: [],
        'trr_ids': [1, 2, 3, 4],
      },
      {
        type: constants.UPDATE_PINBOARD_INFO_STATE,
        payload: {
          attr: 'description',
          value: 'Updated Description',
        },
      }
    ).should.deepEqual({
      id: null,
      title: 'Title',
      description: 'Updated Description',
      'officer_ids': [10, 11, 12, 13, 14],
      crids: [],
      'trr_ids': [1, 2, 3, 4],
    });
  });

  it('should PERFORM_FETCH_PINBOARD_RELATED_DATA', function () {
    pinboardReducer(
      {
        id: '12345678',
        title: 'Pinboard Title',
        description: 'Pinboard Description',
        'officer_ids': [10, 11, 12, 13, 14],
        crids: [],
        'trr_ids': [1, 2, 3, 4],
      },
      {
        type: constants.PERFORM_FETCH_PINBOARD_RELATED_DATA,
        payload: {
          attr: 'description',
          value: 'Updated Description',
        },
      }
    ).should.deepEqual({
      id: '12345678',
      title: 'Pinboard Title',
      description: 'Pinboard Description',
      'officer_ids': [10, 11, 12, 13, 14],
      crids: [],
      'trr_ids': [1, 2, 3, 4],
      needRefreshData: false,
    });
  });
});
