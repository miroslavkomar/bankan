import ColumnContainer from '../../containers/ColumnContainer';
import { useTasks } from '../../contexts/TaskContext';
import { useEffect } from 'react';

function Board() {
  const { getTasks } = useTasks();

  useEffect(() => {
    getTasks();
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
