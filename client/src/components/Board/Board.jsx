import ColumnContainer from '../../containers/ColumnContainer';

function Board() {
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
