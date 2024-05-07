import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Comment } from 'semantic-ui-react';
import { usePopup } from '../../../lib/popup';
import { Markdown } from '../../../lib/custom-ui';

import CommentEdit from './CommentEdit';
import User from '../../User';
import DeleteStep from '../../DeleteStep';

import styles from './ItemComment.module.css';

function ItemComment({ data, createdAt, user }) {
  const commentEdit = useRef(null);

  const handleEditClick = useCallback(() => {
    commentEdit.current.open();
  }, []);

  const DeletePopup = usePopup(DeleteStep);

  return (
    <Comment>
      <span className={styles.user}>
        <User size='auto' name={user} />
      </span>
      <div className={classNames(styles.content)}>
        <div className={styles.title}>
          <span className={styles.author}>{user}</span>
          <span className={styles.date}>{createdAt}</span>
        </div>
        <CommentEdit ref={commentEdit} defaultData={data}>
          <>
            <div className={styles.text}>
              <Markdown linkTarget='_blank'>asdasfsadfsdfasdf</Markdown>
            </div>
            <Comment.Actions>
              <Comment.Action as='button' content={'Edit'} />
              <DeletePopup
                title='Delete Note'
                content='Are you sure you want to delete this note ?'
                buttonContent='Delete note'
              >
                <Comment.Action as='button' content={'Delete'} />
              </DeletePopup>
            </Comment.Actions>
          </>
        </CommentEdit>
      </div>
    </Comment>
  );
}

ItemComment.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default ItemComment;
