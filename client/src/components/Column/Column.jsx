import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../../contexts/TaskContext';
import Card from '../Card';

function Column({ title, className, status }) {
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter((task) => task.stateId === status);

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
