import React, { PropTypes } from 'react';
import { map } from 'lodash';

import {
  paragraphStyle, underlinedLinkStyle, contentStyle, paragraphWrapperStyle, wrapperStyle, headerStyle
} from './collaborate-section.style';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';


class CollaborateSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        wrapper: paragraphWrapperStyle.extraWide,
        paragraph: [paragraphStyle.base, paragraphStyle.extraWide],
        underlineLink: [paragraphStyle.base, paragraphStyle.extraWide, underlinedLinkStyle]
      },
      [DESKTOP]: {
        wrapper: paragraphWrapperStyle.desktop,
        paragraph: [paragraphStyle.base],
        underlineLink: [paragraphStyle.base, underlinedLinkStyle]
      },
      [TABLET]: {
        wrapper: paragraphWrapperStyle.tablet,
        paragraph: [paragraphStyle.base, paragraphStyle.tablet],
        underlineLink: [paragraphStyle.base, paragraphStyle.tablet, underlinedLinkStyle]
      }
    };
  }

  renderBody(paragraphStyle) {
    return map(this.props.body, (paragraph, key) => (
      <p style={ paragraphStyle } key={ key }>
        { paragraph.value }
      </p>
      ));
  }

  renderWithResponsiveStyle(style) {
    const { headerText } = this.props;
    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          { headerText }
        </div>
        <div style={ contentStyle }>
          <div style={ style.wrapper }>
            { this.renderBody(style.paragraph) }
          </div>
        </div>
      </div>
    );
  }
}

CollaborateSection.propTypes = {
  headerText: PropTypes.string,
  body: PropTypes.array
};

export default ConfiguredRadium(CollaborateSection);
