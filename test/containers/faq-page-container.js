import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedFAQPageContainer } from 'containers/faq-page-container';
import FAQListSection from 'components/faq-page/faq-list-section';
import FAQFactory from 'utils/test/factories/faq';


describe('UnconnectedFAQPageContainer', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FAQListSection when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedFAQPageContainer
        requestFAQs={ () => {} } askQuestion={ () => {} } faqs={ FAQFactory.buildList(3) }/>
    );
    findRenderedComponentWithType(instance, FAQListSection);
  });

  it('should call requestFAQs when it just mount', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedFAQPageContainer
        requestFAQs={ callback } askQuestion={ () => {} } faqs={ [] }/>
    );
    callback.called.should.be.true();
  });
});
