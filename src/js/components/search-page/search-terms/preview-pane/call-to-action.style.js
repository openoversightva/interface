import { accentColor, hawkesBlue, lightestAccentColor } from 'utils/styles';

export const linkStyle = {
  position: 'absolute',
  color: accentColor,
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  lineHeight: '40px',
  paddingLeft: '16px',
};

export const actionStyle = {
  height: '40px',
  backgroundColor: hawkesBlue,
  borderRadius: '2px',
  margin: '0 16px',
};


const _actionButtonStyle = {
  width: '51px',
  height: '26px',
  borderRadius: '2px',
  border: `1px solid ${accentColor}`,
  position: 'absolute',
  color: accentColor,
  right: '32px',
  lineHeight: '26px',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  textAlign: 'center',
  margin: '7px 0',
  display: 'inline-block',
};

export const actionButtonStyle = {
  base: _actionButtonStyle,
  hover: {
    ..._actionButtonStyle,
    color: lightestAccentColor,
  }
};
