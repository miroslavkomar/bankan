import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Label from '../Label';
import DueDate from '../DueDate';
import styles from './Card.module.css';
import CardModal from '../CardModal/CardModal';

const priorityLabel = {
  LOW: { fontColor: 'gray', color: 'light-gray' },
  NORMAL: { fontColor: 'white', color: 'lime-green' },
  HIGH: { fontColor: 'white', color: 'berry-red' }
};

function Card(task) {
  const [showCardModal, setShowCardModal] = useState(false);

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
    return {
      name: task.priority,
      fontColor: priorityLabel[task.priority].fontColor,
      color: priorityLabel[task.priority].color
    };
  };
  const label = getLabel();

  const contentNode = (
    <>
      <div className={styles.details}>
        <span className={styles.labels}>
          <span
            className={classNames(styles.attachment, styles.attachmentLeft)}
          >
            <Label
              name={label.name}
              fontColor={label.fontColor}
              color={label.color}
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
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Link className={styles.content} onClick={handleClick}>
          {contentNode}
        </Link>
      </div>
      {showCardModal ? (
        <CardModal task={task} onCloseActionCallback={onModalClose} />
      ) : null}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired
};

export default Card;
