import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'semantic-ui-react';
import {Popup} from '../../../lib/custom-ui';

import {useSteps} from '../../../hooks';
import DeleteStep from '../../DeleteStep';

import styles from './ActionsStep.module.css';

const StepTypes = {
  DELETE: 'DELETE',
};

const ActionsStep = React.memo(({ onNameEdit, onDelete, onClose }) => {
  const [step, openStep, handleBack] = useSteps();

  const handleEditNameClick = useCallback(() => {
    onNameEdit();
    onClose();
  }, [onNameEdit, onClose]);

  const handleDeleteClick = useCallback(() => {
    openStep(StepTypes.DELETE);
  }, [openStep]);

  if (step && step.type === StepTypes.DELETE) {
    return (
      <DeleteStep
        title="common.deleteTask"
        content="common.areYouSureYouWantToDeleteThisTask"
        buttonContent="action.deleteTask"
        onConfirm={onDelete}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <Popup.Header>
        {('common.taskActions', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Menu secondary vertical className={styles.menu}>
          <Menu.Item className={styles.menuItem} onClick={handleEditNameClick}>
            {('action.editDescription', {
              context: 'title',
            })}
          </Menu.Item>
          <Menu.Item className={styles.menuItem} onClick={handleDeleteClick}>
            {('action.deleteTask', {
              context: 'title',
            })}
          </Menu.Item>
        </Menu>
      </Popup.Content>
    </>
  );
});

ActionsStep.propTypes = {
  onNameEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ActionsStep;
