import PropTypes from 'prop-types';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';

import styles from './CardMoveStep.module.css';

function CardMoveStep() {
  return (
    <>
      <Popup.Header>Change state</Popup.Header>
      <Popup.Content>
        <Form>
          <>
            <Dropdown
              selection
              options={['abcd', 'jfg']}
              name='state'
              placeholder={'State'}
              className={styles.field}
            />
          </>
          <Button positive content='Change' />
        </Form>
      </Popup.Content>
    </>
  );
}

CardMoveStep.propTypes = {
  onMove: PropTypes.func,
  onClose: PropTypes.func
};

CardMoveStep.defaultProps = {
  onBack: undefined
};

export default CardMoveStep;
