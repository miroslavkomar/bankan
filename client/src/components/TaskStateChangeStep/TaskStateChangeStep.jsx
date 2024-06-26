import PropTypes from 'prop-types';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';

import styles from './TaskStateChangeStep.module.css';
import { useTaskStates } from '../../contexts/TaskStateContext';
import { useState } from 'react';

function TaskStateChangeStep({ defaultValue, onUpdate, onClose }) {
  const [value, setValue] = useState(defaultValue);
  const { taskStates } = useTaskStates();

  const handleChange = (e, data) => {
    setValue(data.value);
  };

  const handleSubmit = () => {
    onUpdate({ stateId: value });
    onClose();
  };

  return (
    <>
      <Popup.Header>Change state</Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <>
            <Dropdown
              selection
              value={value}
              options={taskStates.map((taskState) => ({
                text: taskState.name,
                value: taskState.id
              }))}
              name='state'
              placeholder={'State'}
              className={styles.field}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </>
          <Button positive content='Change' />
        </Form>
      </Popup.Content>
    </>
  );
}

TaskStateChangeStep.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

TaskStateChangeStep.defaultProps = {
  onBack: undefined
};

export default TaskStateChangeStep;
