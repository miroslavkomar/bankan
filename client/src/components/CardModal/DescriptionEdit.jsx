import React, { useCallback, useImperativeHandle, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import SimpleMDE from 'react-simplemde-editor';

import './DescriptionEdit.css';

const DescriptionEdit = React.forwardRef(({ children, defaultValue, onUpdate }, ref) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setValue(defaultValue || '');
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    const cleanValue = value.trim() || null;

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    setIsOpened(false);
    setValue(null);
  }, [defaultValue, onUpdate, value, setValue]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleChildrenClick = useCallback(() => {
    if (!getSelection().toString()) {
      open();
    }
  }, [open]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        close();
      }
    },
    [close],
  );

  const handleSubmit = useCallback(() => {
    close();
  }, [close]);

  const mdEditorOptions = useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
      status: false,
      toolbar: [
        'bold',
        'italic',
        'heading',
        'strikethrough',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        'table',
        '|',
        'link',
        'image',
        '|',
        'undo',
        'redo',
        '|',
        'guide',
      ],
    }),
    [],
  );

  if (!isOpened) {
    return React.cloneElement(children, {
      onClick: handleChildrenClick,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SimpleMDE
        value={value}
        options={mdEditorOptions}
        placeholder={('common.enterDescription')}
        className="field"
        onKeyDown={handleFieldKeyDown}
        onChange={setValue}
      />
      <div className="controls">
        <Button positive content={('action.save')} />
      </div>
    </Form>
  );
});

DescriptionEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

DescriptionEdit.defaultProps = {
  defaultValue: undefined,
};

export default React.memo(DescriptionEdit);
