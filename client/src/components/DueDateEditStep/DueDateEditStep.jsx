import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import { Input, Popup } from '../../lib/custom-ui';

import styles from './DueDateEditStep.module.css';
import moment from 'moment';

function DueDateEditStep({ defaultValue, onUpdate, onClose }) {
  const [value, setValue] = useState(
    defaultValue ? defaultValue : moment(new Date()).format('YYYY-MM-DD')
  );

  const handleChange = (e, data) => {
    setValue(data.value);
  };
  const handleSubmit = () => {
    onUpdate({ dueDate: value });
    onClose();
  };

  return (
    <>
      <Popup.Header>Due date</Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldBox}>
              <Input
                type='date'
                name='date'
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button positive content='Save' />
        </Form>
      </Popup.Content>
    </>
  );
}

DueDateEditStep.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

DueDateEditStep.defaultProps = {
  defaultValue: undefined
};

export default DueDateEditStep;
