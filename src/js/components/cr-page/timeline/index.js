import React, { Component, PropTypes } from 'react';

import CirclesSVG from './circles-svg';
import TimelineText from './timeline-text';
import styles from './timeline.sass';
import printStyles from 'components/common/print.sass';


export default class Timeline extends Component {
  renderTimeline() {
    const { startDate, endDate, incidentDate } = this.props;

    return (
      <div>
        <span className={ printStyles.hideForPrint }>
          <CirclesSVG
            startDate={ startDate }
            endDate={ endDate }
            incidentDate={ incidentDate }
          />
        </span>
        <TimelineText
          startDate={ startDate }
          endDate={ endDate }
          incidentDate={ incidentDate }/>
      </div>
    );
  }

  render() {
    return (
      <div className={ styles.timeline }>
        <div className='timeline-title'>INVESTIGATION TIMELINE</div>
        { this.renderTimeline() }
      </div>
    );
  }
}

Timeline.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};
