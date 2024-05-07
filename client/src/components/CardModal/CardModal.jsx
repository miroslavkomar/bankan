import PropTypes from 'prop-types';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import { usePopup } from '../../lib/popup';

import Label from '../Label';
import NameField from './NameField';
import DueDateEditStep from '../DueDateEditStep';
import TaskStateChangeStep from '../TaskStateChangeStep';
import PriorityChangeStep from '../PriorityChangeStep';
import DeleteStep from '../DeleteStep';

import styles from './CardModal.module.css';
import DescriptionEdit from './DescriptionEdit';
import { useTasks } from '../../contexts/TaskContext';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { usePriorities } from '../../contexts/PriorityContext';
import { useTaskStates } from '../../contexts/TaskStateContext';
import { useDueDate } from '../../contexts/DueDateContext';
import Activities from './Activities/Activities';

const taskLabel = {
  LOW: { fontColor: 'gray', color: 'light-gray' },
  NORMAL: { fontColor: 'white', color: 'lime-green' },
  HIGH: { fontColor: 'white', color: 'berry-red' },
  TODO: { fontColor: 'white', color: 'dark-pink' },
  'IN PROGRESS': { fontColor: 'white', color: 'sunny-yellow' },
  DONE: { fontColor: 'gray', color: 'light-purple' }
};

function CardModal({ taskId, onCloseActionCallback }) {
  const { tasks, getTasks } = useTasks();
  const { getDueDate } = useDueDate();
  const [task, setTask] = useState(tasks.find((task) => task.id === taskId));

  const { priorities } = usePriorities();
  const { taskStates } = useTaskStates();

  const getPriority = (priorityId) => {
    return priorities.find((priority) => priority.id === priorityId).name;
  };

  const getTaskState = (stateId) => {
    return taskStates.find((taskState) => taskState.id === stateId).name;
  };

  const getLabel = (labelName) => {
    return {
      fontColor: taskLabel[labelName].fontColor,
      color: taskLabel[labelName].color
    };
  };

  const PriorityChangePopup = usePopup(PriorityChangeStep);
  const DueDateEditPopup = usePopup(DueDateEditStep);
  const TaskStateChangePopup = usePopup(TaskStateChangeStep);
  const DeletePopup = usePopup(DeleteStep);

  // const [description, setDescription] = useState([]); pre description
  // fetchovacia funkcia
  // useEffect v ktorom sa zavola fetch pre description

  const handleFieldUpdate = (newField) => {
    setTask({ ...task, ...newField });
  };

  const onSave = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/task`, {
      method: task.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    await getTasks(getDueDate().from, getDueDate().to);
    response.status < 400 && onCloseActionCallback(false);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/task/${task.id}`, {
      method: 'DELETE'
    });
    await getTasks();
    response.status < 400 && onCloseActionCallback(false);
  };

  const contentNode = (
    <Grid className={styles.grid}>
      <Grid.Row className={styles.headerPadding}>
        <Grid.Column width={14} className={styles.headerPadding}>
          <div className={styles.headerWrapper}>
            <Icon name='list alternate outline' className={styles.moduleIcon} />
            <div className={styles.headerTitleWrapper}>
              <NameField
                defaultValue={taskId ? task.name : 'Task name'}
                onUpdate={handleFieldUpdate}
              />
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={styles.modalPadding}>
        <Grid.Column width={10} className={styles.contentPadding}>
          {taskId && (
            <div className={styles.moduleWrapper}>
              <div className={styles.attachments}>
                <div className={styles.text}>Priority</div>
                <span className={styles.attachment}>
                  <Label
                    size='medium'
                    name={getPriority(task.priorityId)}
                    fontColor={getLabel(getPriority(task.priorityId)).fontColor}
                    color={getLabel(getPriority(task.priorityId)).color}
                  />
                </span>
              </div>
              <div className={styles.attachments}>
                <div className={styles.text}>State</div>
                <span className={styles.attachment}>
                  <Label
                    key={task.stateId}
                    size='medium'
                    name={getTaskState(task.stateId)}
                    fontColor={getLabel(getTaskState(task.stateId)).fontColor}
                    color={getLabel(getTaskState(task.stateId)).color}
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
          <Activities></Activities>
        </Grid.Column>
        <Grid.Column width={4} className={styles.sidebarPadding}>
          <div className={styles.actions}>
            <span className={styles.actionsTitle}>Add to card</span>
            {taskId && (
              <TaskStateChangePopup
                defaultValue={task.stateId}
                onUpdate={handleFieldUpdate}
              >
                <Button fluid className={styles.actionButton}>
                  <Icon
                    name='share square outline'
                    className={styles.actionIcon}
                  />
                  Status
                </Button>
              </TaskStateChangePopup>
            )}
            <DueDateEditPopup
              defaultValue={
                task ? task.dueDate : moment(new Date()).format('YYYY-MM-DD')
              }
              onUpdate={handleFieldUpdate}
            >
              <Button fluid className={styles.actionButton}>
                <Icon
                  name='calendar check outline'
                  className={styles.actionIcon}
                />
                Due date
              </Button>
            </DueDateEditPopup>
            <PriorityChangePopup
              defaultValue={task ? task.priorityId : ''}
              onUpdate={handleFieldUpdate}
            >
              <Button fluid className={styles.actionButton}>
                <Icon name='flag outline' className={styles.actionIcon} />
                Priority
              </Button>
            </PriorityChangePopup>
          </div>
          <div className={styles.actions}>
            <span className={styles.actionsTitle}>Actions</span>
            {taskId && (
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
  taskId: PropTypes.string,
  onCloseActionCallback: PropTypes.func.isRequired
};

CardModal.defaultProps = {
  taskId: undefined
};

export default CardModal;
