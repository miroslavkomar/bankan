import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea } from 'semantic-ui-react';

import { useField } from '../../../hooks';

import './NameEdit.css';

const NameEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, handleFieldChange, setValue] = useField(null);

  const field = useRef(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    setIsOpened(false);
    setValue(null);
  }, [setValue]);

  const submit = useCallback(() => {
    const cleanValue = value.trim();

    if (cleanValue && cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    close();
  }, [defaultValue, onUpdate, value, close]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        submit();
      }
    },
    [submit],
  );

  const handleFieldBlur = useCallback(() => {
    submit();
  }, [submit]);

  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);

  useEffect(() => {
    if (isOpened) {
      field.current.ref.current.focus();
    }
  }, [isOpened]);

  if (!isOpened) {
    return children;
  }

  return (
    <Form onSubmit={handleSubmit} className="wrapper">
      <TextArea
        ref={field}
        as={TextareaAutosize}
        value={value}
        minRows={2}
        spellCheck={false}
        className="field"
        onKeyDown={handleFieldKeyDown}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      />
      <div className="controls">
        <Button positive content={('action.save')} />
      </div>
    </Form>
  );
});

NameEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default React.memo(NameEdit);
