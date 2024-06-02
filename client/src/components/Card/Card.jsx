import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Label from '../Label';
import DueDate from '../DueDate';
import styles from './Card.module.css';
import CardModal from '../CardModal/CardModal';
import { usePriorities } from '../../contexts/PriorityContext';
import { Draggable } from 'react-beautiful-dnd';

const priorityLabel = {
  LOW: { fontColor: 'gray', color: 'light-gray' },
  NORMAL: { fontColor: 'white', color: 'lime-green' },
  HIGH: { fontColor: 'white', color: 'berry-red' }
};

function Card({ task, index }) {
  const [showCardModal, setShowCardModal] = useState(false);
  const { priorities } = usePriorities();

  const getPriority = (priorityId) => {
    return priorities.find((priority) => priority.id === priorityId);
  };

  const handleClick = useCallback(() => {
    if (document.activeElement) {
      setShowCardModal(true);
      document.activeElement.blur();
    }
  }, []);

  const onModalClose = (value) => {
    setShowCardModal(value);
  };

  const getLabel = () => {
    const taskPriority = getPriority(task.priorityId).name;
    return {
      name: taskPriority,
      fontColor: priorityLabel[taskPriority].fontColor,
      color: priorityLabel[taskPriority].color
    };
  };

  const contentNode = (
    <>
      <div className={styles.details}>
        <span className={styles.labels}>
          <span
            className={classNames(styles.attachment, styles.attachmentLeft)}
          >
            <Label
              name={getLabel().name}
              fontColor={getLabel().fontColor}
              color={getLabel().color}
              size='small'
            />
          </span>
        </span>
        <div className={styles.name}>{task.name}</div>
        <span className={styles.attachments}>
          {task.dueDate && (
            <span
              className={classNames(styles.attachment, styles.attachmentLeft)}
            >
              <DueDate value={task.dueDate} />
            </span>
          )}
        </span>
      </div>
    </>
  );

  return (
    <Draggable draggableId={`card:${task.id}`} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <div
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
          className={styles.wrapper}
        >
          <div className={styles.card}>
            <Link className={styles.content} onClick={handleClick}>
              {contentNode}
            </Link>
          </div>
          {showCardModal ? (
            <CardModal taskId={task.id} onCloseActionCallback={onModalClose} />
          ) : null}
        </div>
      )}
    </Draggable>
  );
}

Card.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number
};

export default Card;
