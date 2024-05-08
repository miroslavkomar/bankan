import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import { usePopup } from '../../../lib/popup';
import { Markdown } from '../../../lib/custom-ui';

import CommentEdit from './CommentEdit';
import User from '../../User';
import DeleteStep from '../../DeleteStep';

import styles from './ItemComment.module.css';
import moment from 'moment';

const ItemComment = React.memo(({ data, user, onUpdate }) => {
  const [showCommentEdit, setShowCommentEdit] = useState(false);

  const handleEditClick = useCallback(() => {
    setShowCommentEdit(true);
  });

  const onCommentEditClose = (value) => {
    setShowCommentEdit(value);
  };

  const handleNoteUpdate = (note) => {
    onUpdate(note);
  };

  const onDelete = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/note/${data.id}`, {
      method: 'DELETE'
    });
  };

  const DeletePopup = usePopup(DeleteStep);

  return (
    <Comment>
      <span className={styles.user}>
        <User size='auto' name={user} />
      </span>
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.author}>{user}</span>
          <span className={styles.date}>
            {moment(data.changeDate).format('D.M.YYYY HH:mm')}
          </span>
        </div>
        <CommentEdit
          defaultData={data}
          onUpdate={handleNoteUpdate}
          isOpened={showCommentEdit}
          onCloseActionCallback={onCommentEditClose}
        ></CommentEdit>
        {!showCommentEdit && (
          <>
            <div className={styles.text}>
              <Markdown linkTarget='_blank'>{data.text}</Markdown>
            </div>
            <Comment.Actions>
              <Comment.Action
                as='button'
                content={'Edit'}
                onClick={handleEditClick}
              />
              <DeletePopup
                title='Delete Note'
                content='Are you sure you want to delete this note ?'
                buttonContent='Delete note'
                onConfirm={onDelete}
              >
                <Comment.Action as='button' content={'Delete'} />
              </DeletePopup>
            </Comment.Actions>
          </>
        )}
      </div>
    </Comment>
  );
});

ItemComment.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ItemComment;
