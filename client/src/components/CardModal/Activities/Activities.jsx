import React, { useCallback, useEffect, useState } from 'react';
import { Comment, Icon } from 'semantic-ui-react';

import CommentAdd from './CommentAdd';

import styles from './Activities.module.css';
import ItemComment from './ItemComment';
import PropTypes from 'prop-types';

function Activities({ taskId }) {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await fetch(
      'http://localhost:8000/note?' +
        new URLSearchParams({ taskId: taskId }).toString(),
      {
        method: 'GET'
      }
    );
    const jsonResponse = await response.json();
    setNotes(jsonResponse);
    return response.status < 400;
  };

  useEffect(() => {
    getNotes();
  }, []);

  const onCreate = async (note) => {
    const response = await fetch(`http://localhost:8000/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: note.text,
        taskId: taskId
      })
    });
    const jsonResponse = await response.json();
    response.status < 400 &&
      setNotes([
        ...notes,
        {
          id: jsonResponse.id,
          taskId: jsonResponse.taskId,
          text: jsonResponse.text,
          changeDate: jsonResponse.changeDate
        }
      ]);
  };

  const onUpdate = async (newNote) => {
    const response = await fetch(`http://localhost:8000/note`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: newNote.id,
        text: newNote.text
      })
    });
    const jsonResponse = await response.json();
    if (response.status < 400) {
      newNote = { ...newNote, ...jsonResponse };
      setNotes((prevState) =>
        prevState.map((prevNote) => {
          if (prevNote.id === newNote.id) {
            return {
              ...prevNote,
              ...newNote
            };
          }
          return prevNote;
        })
      );
    }
  };

  return (
    <div className={styles.contentModule}>
      <div className={styles.moduleWrapper}>
        <Icon name='list ul' className={styles.moduleIcon} />
        <div className={styles.moduleHeader}>Notes</div>
        <CommentAdd onCreate={onCreate} />
        <div className={styles.wrapper}>
          <Comment.Group>
            {notes
              .sort((note1, note2) => {
                return note1.changeDate < note2.changeDate ? -1 : 0;
              })
              .map((note) => (
                <ItemComment
                  key={note.id}
                  data={note}
                  user={'Firstname Surname'}
                  onUpdate={onUpdate}
                />
              ))}
          </Comment.Group>
        </div>
      </div>
    </div>
  );
}

Activities.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default Activities;
