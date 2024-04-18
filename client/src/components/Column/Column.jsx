import React from 'react';
import PropTypes from 'prop-types';
import Card from "../Card";

function Column({columnTitle, className}) {
    return (
        <div className={className}>
            <h2>{columnTitle}</h2>
            <Card allLabels={[{id: "123", color: "berry-red", name: "HIGH"}]}
                  index={1}
                  dueDate={new Date()}
                  labels={[{id: "123", fontColor: "white", color: "berry-red", name: "HIGH"}]}
                  name={"Zmena v Kanban DB"}
                  id={"12323"}
                  />
        </div>
    );
}

Column.propTypes = {
    columnTitle: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.number
}

export default Column;