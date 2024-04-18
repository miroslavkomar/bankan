import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Paths from '../../constants/Paths';
import Label from '../Label';
import DueDate from '../DueDate';

import './Card.css';

function Card ({id,
               index,
               name,
               dueDate,
               coverUrl,
               labels}) {

    const isPersisted = true;

    const handleClick = useCallback(() => {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }, []);

    const contentNode = (
        <>
            {coverUrl && <img src={coverUrl} alt="" className="cover" />}
            <div className="details">
                {!!labels && (
                    <span className="labels">
              {labels.map((label) => (
                  <span
                      key={label.id}
                      className="attachment attachmentLeft">
                  <Label name={label.name} fontColor={label.fontColor} color={label.color} size="small"/>
                  </span>
              ))}
            </span>)}
                <div className="name">{name}</div>
                <span className="attachments">
                    {dueDate && (
                        <span className="attachment attachmentLeft">
                            <DueDate value={dueDate}/>
                        </span>
                    )}
                </span>
            </div>
        </>
    );

    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className="wrapper">
            <div className="card">
                {isPersisted ? (
                    <>
                        <Link
                            to={Paths.CARDS.replace(':id', id)}
                            className="content"
                            onClick={handleClick}
                        >{contentNode}
                        </Link>
                    </>
                ) : (
                    <span className="content">{contentNode}</span>
                )}
            </div>
    </div>
    );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  coverUrl: PropTypes.string,
  /* eslint-disable react/forbid-prop-types */
  labels: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

Card.defaultProps = {
  dueDate: undefined,
  coverUrl: undefined,
};

export default Card;
