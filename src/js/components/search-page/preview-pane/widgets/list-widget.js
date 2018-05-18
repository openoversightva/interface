import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import pluralize from 'pluralize';


import HoverableLink from 'components/common/hoverable-link';

import {
  containerStyle,
  headerStyle,
  itemCountStyle,
  listItemFirstStyle,
  listItemStyle,
  listStyle,
  itemNameStyle,
  linkStyle,
} from './list-widget.style';


export default class ListWidget extends Component {
  render() {
    const { items, title, typeName, showAvatar } = this.props;

    const wrapWithLink = (component, url) => (
      url ? (
        <HoverableLink
          className='test--list-widget-item-link'
          style={ linkStyle }
          to={ url }
        >
          { component }
        </HoverableLink>
      ): component
    );

    return !!(items && items.length > 0) && (
      <div className='test--list-widget' style={ containerStyle }>
        <h5 style={ headerStyle }>{ title }</h5>
        <ul style={ listStyle }>
          {
            map(items, (item, index) => (
              wrapWithLink(
                (
                  <li style={ listItemStyle(index === items.length - 1) }>
                    { (showAvatar) && (
                      <div style={ listItemFirstStyle }>
                        <img src={ item.image || 'http://via.placeholder.com/32x32' }/>
                      </div>
                    ) }
                    <div>
                      <p style={ itemNameStyle }>{ item.name }</p>
                      <p style={ itemCountStyle }>{ pluralize(typeName, item.count, true) }</p>
                    </div>
                  </li>
                ),
                item.url
              )
            ))
          }
        </ul>
      </div>
    );
  }
}

ListWidget.defaultProps = {
  typeName: 'allegation',
  showAvatar: true
};

ListWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    image: PropTypes.string.optional,
    url: PropTypes.string.optional
  })).isRequired,
  title: PropTypes.string,
  typeName: PropTypes.string.isRequired,
  showAvatar: PropTypes.bool,
};
