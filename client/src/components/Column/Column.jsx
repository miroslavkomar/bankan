import React from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../../contexts/TaskContext';
import Card from '../Card';
import { useTaskStates } from '../../contexts/TaskStateContext';

function Column({ title, className, status }) {
  const { tasks } = useTasks();
  const { taskStates } = useTaskStates();

  const getTaskState = (stateId) => {
    return taskStates.find((taskState) => taskState.id === stateId);
  };

  const filteredTasks = tasks.filter(
    (task) => getTaskState(task.stateId).name === status
  );

  return (
    <div className={className}>
      <h2>{title}</h2>
      {filteredTasks.map((task) => (
        <Card key={task.id} {...task} />
      ))}
    </div>
  );
}

Column.propTypes = {
  columnTitle: PropTypes.string,
  className: PropTypes.string
};

export default Column;
