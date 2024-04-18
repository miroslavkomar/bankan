import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea } from 'semantic-ui-react';

import { useClosableForm, useField } from '../../hooks';

import './NameEdit.css';

const NameEdit = React.forwardRef(({ children, defaultValue }, ref) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, handleFieldChange, setValue] = useField(defaultValue);

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

    if (!cleanValue) {
      field.current.ref.current.select();
      return;
    }

    close();
  }, [defaultValue, value, close]);

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
      switch (event.key) {
        case 'Enter':
          event.preventDefault();

          submit();

          break;
        case 'Escape':
          close();

          break;
        default:
      }
    },
    [close, submit],
  );

  const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(
    close,
    isOpened,
  );

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
    <Form onSubmit={handleSubmit}>
      <div className="fieldWrapper">
        <TextArea
          ref={field}
          as={TextareaAutosize}
          value={value}
          minRows={3}
          maxRows={8}
          spellCheck={false}
          className="field"
          onKeyDown={handleFieldKeyDown}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />
      </div>
      <div className="controls">
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <Button
          positive
          content={('action.save')}
          className="submitButton"
          onMouseOver={handleControlMouseOver}
          onMouseOut={handleControlMouseOut}
        />
      </div>
    </Form>
  );
});

NameEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default React.memo(NameEdit);
