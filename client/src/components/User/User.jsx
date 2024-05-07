import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import initials from 'initials';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './User.module.css';

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  MASSIVE: 'massive',
  AUTO: 'auto'
};

const COLORS = [
  'emerald',
  'peter-river',
  'wisteria',
  'carrot',
  'alizarin',
  'turquoise',
  'midnight-blue'
];

const getColor = (name) => {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) {
    sum += name.charCodeAt(i);
  }

  return COLORS[sum % COLORS.length];
};

function User({ name, size }) {
  return (
    <span
      title={name}
      className={classNames(
        styles.wrapper,
        styles[`wrapper${upperFirst(size)}`],
        styles[`background${upperFirst(camelCase(getColor(name)))}`]
      )}
    >
      <span className={styles.initials}>{initials(name)}</span>
    </span>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.values(SIZES))
};

User.defaultProps = {
  size: SIZES.AUTO
};

export default User;
