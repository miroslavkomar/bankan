import PropTypes from 'prop-types';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import { usePopup } from '../../lib/popup';

import Label from '../Label';
import NameField from './NameField';
import DueDateEditStep from '../DueDateEditStep';
import CardMoveStep from '../CardMoveStep';
import DeleteStep from '../DeleteStep';
import LabelsStep from '../LabelsStep';

import styles from './CardModal.module.css';
import DescriptionEdit from './DescriptionEdit';
import { useTasks } from '../../contexts/TaskContext';
import { useCallback, useState } from 'react';
import moment from 'moment';

const priorityLabel = {
  LOW: { fontColor: 'gray', color: 'light-gray' },
  NORMAL: { fontColor: 'white', color: 'lime-green' },
  HIGH: { fontColor: 'white', color: 'berry-red' }
};

function CardModal({ task, onCloseActionCallback }) {
  const { getTasks } = useTasks();
  const [newTask, setTask] = useState({ ...task });

  const LabelsPopup = usePopup(LabelsStep);
  const DueDateEditPopup = usePopup(DueDateEditStep);
  const CardMovePopup = usePopup(CardMoveStep);
  const DeletePopup = usePopup(DeleteStep);

  // const [description, setDescription] = useState([]); pre description
  // fetchovacia funkcia
  // useEffect v ktorom sa zavola fetch pre description

  const onSave = async (e) => {
    e.preventDefault();
  };

  const handleFieldUpdate = useCallback((fieldName, newValue) => {
    newTask[fieldName] = newValue;
    console.log(fieldName, newTask[fieldName]);
  }, []);

  const onDelete = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/task/${task.id}`, {
      method: 'DELETE'
    });
    const responseStatus = await getTasks();
    responseStatus && onCloseActionCallback(false);
  };

  const contentNode = (
    <Grid className={styles.grid}>
      <Grid.Row className={styles.headerPadding}>
        <Grid.Column width={14} className={styles.headerPadding}>
          <div className={styles.headerWrapper}>
            <Icon name='list alternate outline' className={styles.moduleIcon} />
            <div className={styles.headerTitleWrapper}>
              <NameField
                defaultValue={task ? task.name : 'Task name'}
                onUpdate={handleFieldUpdate}
              />
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles.modalPadding}>
        <Grid.Column width={10} className={styles.contentPadding}>
          {task && (
            <div className={styles.moduleWrapper}>
              <div className={styles.attachments}>
                <div className={styles.text}>Priority</div>
                <span className={styles.attachment}>
                  <Label
                    size='medium'
                    name={task.priority}
                    fontColor={priorityLabel[task.priority].fontColor}
                    color={priorityLabel[task.priority].color}
                  />
                </span>
              </div>
              <div className={styles.attachments}>
                <div className={styles.text}>Due date</div>
                <span className={styles.attachment}>
                  <Label
                    size='medium'
                    name={task.dueDate}
                    fontColor={'gray'}
                    color={'light-gray'}
                  />
                </span>
              </div>
            </div>
          )}
          <div className={styles.contentModule}>
            <div className={styles.moduleWrapper}>
              <Icon name='align justify' className={styles.moduleIcon} />
              <div className={styles.moduleHeader}>Description</div>
              <DescriptionEdit
                defaultValue={task ? task.description : ''}
                onUpdate={handleFieldUpdate}
              />
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={4} className={styles.sidebarPadding}>
          <div className={styles.actions}>
            <span className={styles.actionsTitle}>Add to card</span>
            {task && (
              <CardMovePopup>
                <Button className={styles.actionButton}>
                  <Icon
                    name='share square outline'
                    className={styles.actionIcon}
                  />
                  Change state
                </Button>
              </CardMovePopup>
            )}
            <DueDateEditPopup
              defaultValue={
                task ? task.dueDate : moment(new Date()).format('YYYY-MM-DD')
              }
            >
              <Button className={styles.actionButton}>
                <Icon
                  name='calendar check outline'
                  className={styles.actionIcon}
                />
                Due date
              </Button>
            </DueDateEditPopup>
            <CardMovePopup>
              <Button className={styles.actionButton}>
                <Icon name='flag outline' className={styles.actionIcon} />
                Priority
              </Button>
            </CardMovePopup>
          </div>
          <div className={styles.actions}>
            <span className={styles.actionsTitle}>Actions</span>
            {task && (
              <DeletePopup
                title='Delete Task'
                content='Are you sure you want to delete this task ?'
                buttonContent='Delete task'
                onConfirm={onDelete}
              >
                <Button fluid className={styles.actionButton}>
                  <Icon
                    name='trash alternate outline'
                    className={styles.actionIcon}
                  />
                  Delete Task
                </Button>
              </DeletePopup>
            )}
            <Button fluid className={styles.actionButton} onClick={onSave}>
              <Icon name='save outline' className={styles.actionIcon} />
              Save
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return (
    <Modal
      open
      onClose={() => onCloseActionCallback(false)}
      closeIcon
      centered={false}
      className={styles.wrapper}
    >
      {contentNode}
    </Modal>
  );
}

CardModal.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  onCloseActionCallback: PropTypes.func.isRequired
};

CardModal.defaultProps = {
  description: undefined,
  dueDate: undefined
};

export default CardModal;
