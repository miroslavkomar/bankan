import React, { useCallback } from 'react';
import { Comment, Icon } from 'semantic-ui-react';

import CommentAdd from './CommentAdd';

import styles from './Activities.module.css';
import ItemComment from './ItemComment';

function Activities({}) {
  return (
    <div className={styles.contentModule}>
      <div className={styles.moduleWrapper}>
        <Icon name='list ul' className={styles.moduleIcon} />
        <div className={styles.moduleHeader}>Notes</div>
        <CommentAdd />
        <div className={styles.wrapper}>
          <Comment.Group>
            <ItemComment
              key={'123123124'}
              data={'len tak'}
              createdAt={'2023-04-20'}
              user={'Firstname Surname'}
            />
          </Comment.Group>
        </div>
      </div>
    </div>
  );
}

Activities.propTypes = {};

export default Activities;
