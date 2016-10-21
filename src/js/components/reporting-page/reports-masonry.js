import React, { Component, PropTypes } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

import ReportGroup from './report-group';
import { masonrySizes } from './group-types';
import { wrapperStyle, borderSleeveStyle } from './reports-masonry.style';


export default class ReportsMasonry extends Component {
  componentDidMount() {
    this.props.loadMore();
  }

  render() {
    const { hasMore, loadMore, reportGroups, onReportClick, nextParams } = this.props;

    return (
      <div>
        <div style={ borderSleeveStyle }/>
        <div style={ wrapperStyle }>
          <MasonryInfiniteScroller
            hasMore={ hasMore }
            loadMore={ loadMore.bind(null, nextParams) }
            sizes={ masonrySizes }>
            {
              reportGroups.map(group => (
                <ReportGroup
                  key={ group.key }
                  onReportClick={ onReportClick }
                  { ...group }/>
              ))
            }
          </MasonryInfiniteScroller>
        </div>
      </div>
    );
  }
}

ReportsMasonry.propTypes = {
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  reportGroups: PropTypes.array,
  onReportClick: PropTypes.func,
  nextParams: PropTypes.object
};
