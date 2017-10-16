import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import SummarySection from './summary-section';
import AggregateSection from './aggregate-section';
import { wrapperStyle } from './summary-page.style.js';


export default class SummaryPage extends Component {
  render() {
    const {
      officerSummary, complaintsCount, sustainedCount, complaintFacets, openBottomSheetWithPoliceUnit, complaintsByYear
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <ResponsiveFluidWidthComponent>
          <SummarySection officerSummary={ officerSummary }
            openBottomSheetWithPoliceUnit={ openBottomSheetWithPoliceUnit } />
          <AggregateSection
            dateOfAppt={ officerSummary ? officerSummary.dateOfAppt : null }
            title='complaint records (CRs)' count={ complaintsCount } sustainedCount={ sustainedCount }
            complaintsByYear={ complaintsByYear }
            aggregateFacets={ complaintFacets }/>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  officerSummary: PropTypes.object,
  complaintsCount: PropTypes.number,
  complaintFacets: PropTypes.array,
  sustainedCount: PropTypes.number,
  fetchOfficerSummary: PropTypes.func,
  openBottomSheetWithPoliceUnit: PropTypes.func,
  complaintsByYear: PropTypes.array
};

SummaryPage.contextTypes = {
  store: PropTypes.object
};
