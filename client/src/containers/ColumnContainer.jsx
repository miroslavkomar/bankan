import Column from '../components/Column/Column';

const columns = [
  {
    id: 1,
    title: 'To do',
    status: 'TODO',
    className: 'board_column col_first'
  },
  {
    id: 2,
    title: 'In progress',
    status: 'IN_PROGRESS',
    className: 'board_column col_second'
  },
  { id: 3, title: 'Done', status: 'DONE', className: 'board_column col_third' }
];

function ColumnContainer() {
  return (
    <div className='column__container'>
      {columns.map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </div>
  );
}

export default ColumnContainer;
