import Column from '../components/Column/Column';

const columns = [
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
  return (
    <div className='column__container'>
      {columns.map((column) => (
        <Column key={column.status} {...column} />
      ))}
    </div>
  );
}

export default ColumnContainer;
