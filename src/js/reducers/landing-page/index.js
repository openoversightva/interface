import { combineReducers } from 'redux';

import faqSection from './faq-section';
import reportSection from './report-section';
import suggestionApp from './suggestion-app';
import heroSection from './hero-section';
import vftgSection from './vftg-section';
import aboutSection from './about-section';
import collaborateSection from './collaborate-section';
import isRequesting from './is-requesting';


export default combineReducers({
  faqSection,
  reportSection,
  suggestionApp,
  heroSection,
  vftgSection,
  aboutSection,
  collaborateSection,
  isRequesting
});
