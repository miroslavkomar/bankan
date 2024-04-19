import upperFirst from 'lodash/upperFirst';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import styles from './DueDate.module.css';

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
};


function DueDate ({value, size}) {
  return (
      <span
          className={classNames(
              styles.wrapper,
              styles[`wrapper${upperFirst(size)}`]
          )}
      >
      {value.getDate()}.{value.getMonth() + 1}.{value.getFullYear()}
    </span>
  );
}

DueDate.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  size: PropTypes.oneOf(Object.values(SIZES)),
};

DueDate.defaultProps = {
  size: SIZES.MEDIUM
};

export default DueDate;
