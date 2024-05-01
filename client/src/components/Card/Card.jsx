import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import Paths from '../../constants/Paths';
import Label from '../Label';
import DueDate from '../DueDate';
import styles from './Card.module.css';
import CardModal from "../CardModal/CardModal";

function Card ({id,
               index,
               name,
               dueDate,
               coverUrl,
               labels}) {

    const isPersisted = true;
    const [showCardModal, setShowCardModal] = useState(false);

    const handleClick = useCallback(() => {
        if (document.activeElement) {
            setShowCardModal(true);
            document.activeElement.blur();
        }
    }, []);

    const contentNode = (
        <>
            {coverUrl && <img src={coverUrl} alt="" className={styles.cover} />}
            <div className={styles.details}>
                {!!labels && (
                    <span className={styles.labels}>
              {labels.map((label) => (
                  <span
                      key={label.id}
                      className={classNames(styles.attachment, styles.attachmentLeft)}
                  >
                  <Label name={label.name} fontColor={label.fontColor} color={label.color} size="small"/>
                  </span>
              ))}
            </span>)}
                <div className={styles.name}>{name}</div>
                <span className={styles.attachments}>
                    {dueDate && (
                        <span className={classNames(styles.attachment, styles.attachmentLeft)}>
                            <DueDate value={dueDate}/>
                        </span>
                    )}
                </span>
            </div>
        </>
    );

    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={styles.wrapper}>
            <div className={styles.card}>
                {isPersisted ? (
                    <>
                        <Link
                            to={Paths.CARDS.replace(':id', id)}
                            className={styles.content}
                            onClick={handleClick}
                        >{contentNode}
                        </Link>
                    </>
                ) : (
                    <span className={styles.content}>{contentNode}</span>
                )}
            </div>
            {showCardModal ? <CardModal name={"Nazov tasku"} dueDate={"2024-04-30"} description={""} labels={[{id: "123", fontColor: "white", color: "berry-red", name: "HIGH"}]}/> : null}
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
