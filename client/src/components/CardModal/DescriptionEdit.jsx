import PropTypes from 'prop-types';
import { Form, TextArea } from 'semantic-ui-react';

import './DescriptionEdit.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './DescriptionEdit.module.css';
import { useState } from 'react';

function DescriptionEdit({ defaultValue, onUpdate }) {
  const [value, setValue] = useState(defaultValue);

  const handleUpdate = (e) => {
    setValue(e.target.value);
    onUpdate({ description: e.target.value });
  };

  return (
    <Form>
      <TextArea
        as={TextareaAutosize}
        value={value}
        name='description'
        placeholder={'Add more detailed description'}
        minRows={3}
        spellCheck={false}
        className={styles.field}
        onChange={handleUpdate}
      />
    </Form>
  );
}

DescriptionEdit.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired
};

DescriptionEdit.defaultProps = {
  defaultValue: ''
};

export default DescriptionEdit;
