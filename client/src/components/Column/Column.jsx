import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import { Droppable } from 'react-beautiful-dnd';

function Column({ column }) {
  let cardIndex = 0;
  const cards = column.list.map((task) => {
    return <Card key={task.id} task={task} index={cardIndex++} />;
  });
  return (
    <>
      <div className={column.className}>
        <h2>{column.title}</h2>
        <Droppable droppableId={column.id} index={column.index}>
          {({ innerRef, droppableProps, placeholder }) => (
            <div {...droppableProps} ref={innerRef}>
              {!!column.list.length && cards}
              {placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}

Column.propTypes = {
  column: PropTypes.object
};

export default Column;
