import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { TextArea } from 'semantic-ui-react';

import { useField } from '../../hooks';

import styles from './NameField.module.css';

function NameField({ defaultValue }) {
  const [value, handleChange, setValue] = useField(defaultValue);

  const isFocused = useRef(false);

  const handleFocus = useCallback(() => {
    isFocused.current = true;
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      event.target.blur();
    }
  }, []);

  return (
    <TextArea
      as={TextareaAutosize}
      value={value}
      spellCheck={false}
      className={styles.field}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
}

NameField.propTypes = {
  defaultValue: PropTypes.string.isRequired
};

export default NameField;
