import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { spy, useFakeTimers } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import BaseCard from 'components/pinboard-page/cards/base-card';


describe('BaseCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should fade in when added', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<BaseCard item={ item } isAdded={ true }/>);

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('hide');
    instanceDom.className.should.containEql('fade-in');
  });

  it('should fade out when removed', function () {
    const clock = useFakeTimers();
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'CR',
      isPinned: false,
      id: '123',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(
      <BaseCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    instance.removeItem();

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('fade-out');
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(1050);

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      isPinned: false,
      id: '123'
    });

    clock.restore();
  });
});
