import Column from '../components/Column/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTaskStates } from '../contexts/TaskStateContext';
import { useEffect, useState } from 'react';
import { useTasks } from '../contexts/TaskContext';

const initialColumns = [
  {
    status: 'TODO',
    title: 'To do',
    className: 'board_column col_first'
  },
  {
    status: 'IN PROGRESS',
    title: 'In progress',
    className: 'board_column col_second'
  },
  { status: 'DONE', title: 'Done', className: 'board_column col_third' }
];

function ColumnContainer() {
  const { tasks } = useTasks();
  const { taskStates } = useTaskStates();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const drawnColumns = [...initialColumns];
    let columnIndex = 0;
    if (!!taskStates.length) {
      drawnColumns.map((column) => {
        const state = taskStates.find((state) => state.name === column.status);
        column.id = state.id;
        column.index = columnIndex;
        column.list = tasks.filter((task) => task.stateId === column.id);
        columnIndex++;
      });
      setColumns(drawnColumns);
    }
  }, [taskStates, tasks]);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) {
      return null;
    }

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }

    // Set start and end variables
    const start = columns.find((column) => column.id === source.droppableId);
    const end = columns.find((column) => column.id === destination.droppableId);

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = { id: end.id, list: newEndList };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='column__container'>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default ColumnContainer;
