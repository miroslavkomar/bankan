import PropTypes from 'prop-types';

import ColumnContainer from "../../containers/ColumnContainer";
import CardModal from "../CardModal";

function Board({isCardModalOpened}) {
    return (
        <>
            <section className="kanban">
                <h1>Kanban Board</h1>
                <ColumnContainer/>
            </section>
            {isCardModalOpened && <CardModal/>}
        </>
    );
}

Board.propTypes = {
    isCardModalOpened: PropTypes.bool.isRequired,
};

export default Board;