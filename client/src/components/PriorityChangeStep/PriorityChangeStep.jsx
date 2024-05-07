import PropTypes from 'prop-types';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';

import styles from './PriorityChangeStep.module.css';
import { useCallback, useState } from 'react';
import { usePriorities } from '../../contexts/PriorityContext';

function PriorityChangeStep({ defaultValue, onUpdate, onClose }) {
  const [value, setValue] = useState(defaultValue);
  const { priorities } = usePriorities();

  const handleChange = (e, data) => {
    setValue(data.value);
  };

  const handleSubmit = () => {
    onUpdate({ priorityId: value });
    onClose();
  };

  return (
    <>
      <Popup.Header>Change priority</Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <>
            <Dropdown
              selection
              value={value}
              options={priorities.map((priority) => ({
                text: priority.name,
                value: priority.id
              }))}
              name='priority'
              placeholder={'Priority'}
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

PriorityChangeStep.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

PriorityChangeStep.defaultProps = {
  onBack: undefined
};

export default PriorityChangeStep;
