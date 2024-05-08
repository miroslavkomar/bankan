import { dequal } from 'dequal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Form, TextArea } from 'semantic-ui-react';

import { useClosableForm, useForm } from '../../../hooks';

import styles from './CommentEdit.module.css';

function CommentEdit({
  defaultData,
  onUpdate,
  isOpened,
  onCloseActionCallback
}) {
  const [data, handleFieldChange, setData] = useForm(defaultData);
  const textField = useRef(null);

  const close = useCallback(() => {
    setData(defaultData);
    onCloseActionCallback(false);
  }, []);

  useEffect(() => {
    if (isOpened) {
      textField.current.ref.current.focus();
    }
  }, [isOpened]);

  const submit = useCallback(() => {
    const cleanData = {
      ...data,
      text: data.text.trim()
    };

    if (cleanData.text && !dequal(cleanData, defaultData)) {
      onUpdate(cleanData);
    }

    close();
  }, [defaultData, onUpdate, data, close]);

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

  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);

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

CommentEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired
};

export default React.memo(CommentEdit);
