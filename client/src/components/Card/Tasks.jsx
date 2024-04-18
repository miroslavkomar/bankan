import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'semantic-ui-react';
import { useToggle } from '../../lib/hooks';

import './Tasks.css';

const Tasks = React.memo(({ items }) => {
  const [isOpened, toggleOpened] = useToggle();

  const handleToggleClick = useCallback(
    (event) => {
      event.preventDefault();

      toggleOpened();
    },
    [toggleOpened],
  );

  const completedItems = items.filter((item) => item.isCompleted);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                                   jsx-a11y/no-static-element-interactions */}
      <div className="button" onClick={handleToggleClick}>
        <span className="progressWrapper">
          <Progress
            autoSuccess
            value={completedItems.length}
            total={items.length}
            color="blue"
            size="tiny"
            className="progress"
          />
        </span>
        <span
          className={classNames("count", isOpened ? "countOpened" : "countClosed")}
        >
          {completedItems.length}/{items.length}
        </span>
      </div>
      {isOpened && (
        <ul className="tasks">
          {items.map((item) => (
            <li
              key={item.id}
              className={classNames("task", item.isCompleted && "taskCompleted")}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

Tasks.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Tasks;
