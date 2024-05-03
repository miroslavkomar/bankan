import React, { useCallback, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../../contexts/TaskContext';
import moment from 'moment';
import CardModal from '../CardModal';

function Form() {
  const init = {
    dueDateFrom: moment(new Date()).format('YYYY-MM-DD'),
    dueDateTo: moment(new Date()).format('YYYY-MM-DD')
  };
  const { getTasks } = useTasks();

  const [showCardModal, setShowCardModal] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'reset':
        return init;
      case 'change':
        /*eslint-disable */
        const { name, value } = action.element;
        /*eslint-enable */
        state = { ...state, [name]: value };
        getTasks(state.dueDateFrom, state.dueDateTo);
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
      {/*{showCardModal ? (*/}
      {/*  <CardModal*/}
      {/*    taskId={id}*/}
      {/*    name={'Nazov tasku'}*/}
      {/*    dueDate={'2024-04-30'}*/}
      {/*    description={''}*/}
      {/*    labels={[*/}
      {/*      { id: '123', fontColor: 'white', color: 'berry-red', name: 'HIGH' }*/}
      {/*    ]}*/}
      {/*    onCloseActionCallback={onModalClose}*/}
      {/*  />*/}
      {/*) : null}*/}
    </form>
  );
}

Form.propTypes = {
  getNewTask: PropTypes.func
};

export default Form;
