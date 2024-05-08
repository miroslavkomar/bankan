import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import { usePopup } from '../../../lib/popup';
import { Markdown } from '../../../lib/custom-ui';

import NoteEdit from './NoteEdit';
import User from '../../User';
import DeleteStep from '../../DeleteStep';

import styles from './ItemNote.module.css';
import moment from 'moment';

function ItemNote({ note, user, onUpdate, onDelete }) {
  const [showNoteEdit, setShowNoteEdit] = useState(false);

  const handleEditClick = () => {
    setShowNoteEdit(true);
  };

  const onNoteEditClose = (value) => {
    setShowNoteEdit(value);
  };

  const handleNoteDelete = () => {
    onDelete(note);
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
            {moment(note.changeDate).format('D.M.YYYY HH:mm')}
          </span>
        </div>
        <NoteEdit
          defaultData={note}
          onUpdate={onUpdate}
          isOpened={showNoteEdit}
          onCloseActionCallback={onNoteEditClose}
        ></NoteEdit>
        {!showNoteEdit && (
          <>
            <div className={styles.text}>
              <Markdown linkTarget='_blank'>{note.text}</Markdown>
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
                onConfirm={handleNoteDelete}
              >
                <Comment.Action as='button' content={'Delete'} />
              </DeletePopup>
            </Comment.Actions>
          </>
        )}
      </div>
    </Comment>
  );
}

ItemNote.propTypes = {
  note: PropTypes.object.isRequired,
  user: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ItemNote;
