import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { NewMetricWidget as MetricWidget } from 'components/common/preview-pane/widgets';
import MetricWidgetItem from 'components/common/preview-pane/widgets/new-metric-widget-item';
import { unmountComponentSuppressError } from 'utils/test';


describe('NewMetricWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain number of MetricWidgetItem components', () => {
    const metrics = [
      {
        name: 'name1',
        value: 23,
        description: 'description1'
      },
      {
        name: 'name2',
        value: 12,
        description: 'description2',
        isHighlight: true,
      },
    ];
    instance = renderIntoDocument(
      <MetricWidget metrics={ metrics }/>
    );
    scryRenderedComponentsWithType(instance, MetricWidgetItem).should.have.lengthOf(2);
  });

  it('should split into groups with the length of 2', () => {
    const metrics = [
      {
        name: 'name1',
        value: 23,
        description: 'description1'
      },
      {
        name: 'name2',
        value: 12,
        description: 'description2'
      },
      {
        name: 'name3',
        value: 34,
        description: 'description3'
      },
    ];
    instance = renderIntoDocument(
      <MetricWidget metrics={ metrics }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--metric-widget-chunk').should.have.lengthOf(2);
  });
});
