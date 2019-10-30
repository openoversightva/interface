import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { omit } from 'lodash';

export const CONFIRM_MESSAGE = `
  Pinboard is saving, changes you made may not be saved.
  Are you sure you want to navigate away from this page?
`;

export default class PinboardLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { hasPendingChanges, onClick } = this.props;
    e.stopPropagation();
    if (!hasPendingChanges || window.confirm(CONFIRM_MESSAGE)) {
      onClick(e);
    }
  }

  render() {
    const { customComponent } = this.props;
    const componentProps = omit(this.props, 'onClick', 'hasPendingChanges', 'customComponent');
    const ContentComponent = customComponent || Link;

    return (
      <ContentComponent { ...componentProps } onClick={ this.handleClick } />
    );
  }
}

PinboardLink.propTypes = {
  hasPendingChanges: PropTypes.bool,
  customComponent: PropTypes.string,
};
