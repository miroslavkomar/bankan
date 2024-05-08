import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { TextArea } from 'semantic-ui-react';

import styles from './NameField.module.css';

function NameField({ defaultValue, onUpdate }) {
  const [value, setValue] = useState(defaultValue);

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

  const handleBlur = useCallback(() => {
    isFocused.current = false;

    const cleanValue = value.trim();

    if (cleanValue) {
      if (cleanValue !== defaultValue) {
        onUpdate(cleanValue);
      }
    } else {
      setValue(defaultValue);
    }
  }, [defaultValue, onUpdate, value, setValue]);

  const handleUpdate = (e) => {
    setValue(e.target.value);
    onUpdate({ name: e.target.value });
  };

  return (
    <TextArea
      as={TextareaAutosize}
      value={value}
      spellCheck={false}
      className={styles.field}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onChange={handleUpdate}
      onBlur={handleBlur}
    />
  );
}

NameField.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default NameField;
