import { dequal } from 'dequal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea } from 'semantic-ui-react';

import { useClosableForm, useForm } from '../../../hooks';

import styles from './NoteEdit.module.css';

function NoteEdit({ defaultData, onUpdate, isOpened, onCloseActionCallback }) {
  const [data, handleFieldChange, setData] = useForm(defaultData);
  const textField = useRef(null);

  const close = () => {
    setData(defaultData);
    onCloseActionCallback(false);
  };

  useEffect(() => {
    if (isOpened) {
      textField.current.ref.current.focus();
    }
  }, [isOpened]);

  const submit = () => {
    const cleanData = {
      ...data,
      text: data.text.trim()
    };

    if (cleanData.text && !dequal(cleanData, defaultData)) {
      onUpdate(cleanData);
    }
    handleControlMouseOut();

    onCloseActionCallback(false);
  };

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        submit();
      }
    },
    [submit]
  );

  const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] =
    useClosableForm(close);

  const handleSubmit = () => {
    submit();
  };

  return (
    <>
      {isOpened && (
        <Form onSubmit={handleSubmit}>
          <TextArea
            ref={textField}
            as={TextareaAutosize}
            name='text'
            value={data.text}
            minRows={3}
            spellCheck={false}
            className={styles.field}
            onKeyDown={handleFieldKeyDown}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />
          <div className={styles.controls}>
            <Button
              positive
              content={'Save'}
              onMouseOver={handleControlMouseOver}
              onMouseOut={handleControlMouseOut}
            />
          </div>
        </Form>
      )}
    </>
  );
}

NoteEdit.propTypes = {
  defaultData: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default NoteEdit;
