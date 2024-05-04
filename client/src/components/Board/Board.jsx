import ColumnContainer from '../../containers/ColumnContainer';
import { useTasks } from '../../contexts/TaskContext';
import { useEffect } from 'react';
import { useTaskStates } from '../../contexts/TaskStateContext';
import { usePriorities } from '../../contexts/PriorityContext';

function Board() {
  const { getTasks } = useTasks();
  const { getTaskStates } = useTaskStates();
  const { getPriorities } = usePriorities();

  useEffect(() => {
    getTasks();
    getTaskStates();
    getPriorities();
  }, []);

  return (
    <>
      <section className='kanban'>
        <h1>Kanban Board</h1>
        <ColumnContainer />
      </section>
    </>
  );
}

export default Board;
