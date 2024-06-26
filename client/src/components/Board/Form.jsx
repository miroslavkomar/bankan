import React, { useCallback, useReducer, useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import moment from 'moment';
import CardModal from '../CardModal';

function Form() {
  const init = {
    dueDateFrom: moment(new Date()).format('YYYY-MM-DD'),
    dueDateTo: moment(new Date()).format('YYYY-MM-DD')
  };
  const { setTasksDueDate, getTasks } = useTasks();
  const [showCardModal, setShowCardModal] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'reset':
        return init;
      case 'change':
        const { name, value } = action.element;
        state = { ...state, [name]: value };
        setTasksDueDate({
          dueDateFrom: state.dueDateFrom ? state.dueDateFrom : init.dueDateFrom,
          dueDateTo: state.dueDateTo ? state.dueDateTo : init.dueDateTo
        });
        return state;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);
  const { dueDateFrom, dueDateTo } = state;

  const handleClick = useCallback(() => {
    if (document.activeElement) {
      setShowCardModal(true);
      document.activeElement.blur();
    }
  }, []);

  const onModalClose = (value) => {
    setShowCardModal(value);
  };

  return (
    <form className='task_form'>
      <div className='form__container'>
        <h1>BanKan</h1>
        <div>
          <input
            name='dueDateFrom'
            className={'dueDateInput'}
            value={dueDateFrom}
            type='date'
            onChange={(e) => dispatch({ type: 'change', element: e.target })}
            placeholder='due date from'
          />
          <input
            name='dueDateTo'
            className={'dueDateInput'}
            value={dueDateTo}
            type='date'
            onChange={(e) => dispatch({ type: 'change', element: e.target })}
            placeholder='due date to'
          />
        </div>
        <button type='button' className='create__button' onClick={handleClick}>
          Plan Task
        </button>
      </div>
      {showCardModal ? (
        <CardModal onCloseActionCallback={onModalClose} />
      ) : null}
    </form>
  );
}

export default Form;
