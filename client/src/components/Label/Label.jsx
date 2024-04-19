import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LabelColors from '../../constants/LabelColors';

import styles from './Label.module.css';
import globalStyles from '../../styles.module.css';

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium'
};

const FONT_COLORS = {
  WHITE: 'white',
  BLACK: 'black'
}

const Label = React.memo(({ name, fontColor, color, size, isDisabled, onClick }) => {
  const contentNode = (
    <div
      title={name}
      className={classNames(
         styles.wrapper,
        !name && styles.wrapperNameless,
        styles[`wrapper${upperFirst(size)}`],
        onClick && styles.wrapperHoverable,
        globalStyles[`font${upperFirst(fontColor)}`],
        globalStyles[`background${upperFirst(camelCase(color))}`],
      )}
    >
      {name || '\u00A0'}
    </div>
  );

  return onClick ? (
    <button type="button" disabled={isDisabled} className="button" onClick={onClick}>
      {contentNode}
    </button>
  ) : (
    contentNode
  );
});

Label.propTypes = {
  name: PropTypes.string,
  fontColor: PropTypes.oneOf(Object.values(FONT_COLORS)),
  color: PropTypes.oneOf(LabelColors).isRequired,
  size: PropTypes.oneOf(Object.values(SIZES)),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Label.defaultProps = {
  name: undefined,
  fontColor: "white",
  size: SIZES.MEDIUM,
  isDisabled: false,
  onClick: undefined,
};

export default Label;
