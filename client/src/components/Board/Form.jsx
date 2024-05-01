import React, {useReducer} from 'react';

import PropTypes from 'prop-types';

function Form (props) {

    const init = {dueDateFrom:'', dueDateTo:''}

    const reducer = (state, action) => {
        switch(action.type) {
        case 'reset':
            return init;
        case 'change':
            /*eslint-disable */
            const {name, value} = action.element;
            /*eslint-enable */
            return {...state, [name]:value};
        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, init)
    const {dueDateFrom, dueDateTo} = state

    return (
        <form className="form">
            <div className="form__container">
                <h1>BanKan</h1>
                <div>
                    <label> <input name='dueDateFrom' className={"dueDateInput"} value={dueDateFrom} type='date' onChange={e => dispatch({type: 'change', element: e.target})}
                                   placeholder='due date from' required/></label>
                    <label> <input name='dueDateTo' className={"dueDateInput"} value={dueDateTo} type='date' onChange={e => dispatch({type: 'change', element: e.target})}
                                   placeholder='due date from to' required/></label>
                </div>
                <button type="button" className="create__button">Plan Task</button>
            </div>
        </form>
    )
}

Form.propTypes = {
    getNewTask: PropTypes.func
}

export default Form;