import React from 'react';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PoliceDistrictPane from 'components/search-page/preview-pane/police-district-pane';
import {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  ViewWidget,
} from 'components/search-page/preview-pane/widgets';


describe('PoliceDistrictPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<PoliceDistrictPane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, GeoInfoWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    findRenderedComponentWithType(instance, ViewWidget);
  });
});
