import React from 'react';
import Column from '../components/Column/Column'

import {ColumnContext} from "../ColumnContext";

function ColumnContainer() {

    const {Consumer: ColumnConsumer} = ColumnContext;

    const generateColumns = (context) => {

        return context.columns.map(column =>
            <Column className={column.className} key={column.id} id={column.id} item={column} columnTitle={column.title}/>)
    }

    return (
        <div className="column__container">
            <ColumnConsumer>
                {(context) =>  generateColumns(context)}
            </ColumnConsumer>
        </div>
    )
}

export default ColumnContainer