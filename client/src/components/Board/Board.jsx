import ColumnContainer from "../../containers/ColumnContainer";
import CardModalContainer from "../../containers/CardModalContainer";

function Board({isCardModalOpened}) {
    return (
        <>
            <section className="kanban">
                <h1>Kanban Board</h1>
                <ColumnContainer/>
            </section>
            {isCardModalOpened && <CardModalContainer/>}
        </>
    );
}

Board.propTypes = {
    isCardModalOpened: PropTypes.bool.isRequired,
};

export default Board;