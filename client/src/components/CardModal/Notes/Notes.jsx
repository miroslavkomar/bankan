import React, { useEffect, useState } from 'react';
import { Comment, Icon } from 'semantic-ui-react';

import NoteAdd from './NoteAdd';

import styles from './Notes.module.css';
import ItemNote from './ItemNote';
import PropTypes from 'prop-types';

function Notes({ taskId }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch(
      'http://localhost:8000/note?' +
        new URLSearchParams({ taskId: taskId }).toString(),
      {
        method: 'GET'
      }
    );
    const jsonResponse = await response.json();
    if (response.status < 400) {
      setNotes(jsonResponse);
    } else {
      alert(
        'Something went wrong while getting notes: ' +
          JSON.stringify(jsonResponse)
      );
    }
  };

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
    if (response.status < 400) {
      setNotes([
        ...notes,
        {
          id: jsonResponse.id,
          taskId: jsonResponse.taskId,
          text: jsonResponse.text,
          changeDate: jsonResponse.changeDate
        }
      ]);
    } else {
      alert(
        'Something went wrong while creating note: ' +
          JSON.stringify(jsonResponse)
      );
    }
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
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) => {
          if (prevNote.id === newNote.id) {
            return {
              ...prevNote,
              ...newNote
            };
          }
          return prevNote;
        })
      );
    } else {
      alert(
        'Something went wrong while updating note: ' +
          JSON.stringify(jsonResponse)
      );
    }
  };

  const onDelete = async (note) => {
    const response = await fetch(`http://localhost:8000/note/${note.id}`, {
      method: 'DELETE'
    });
    if (response.status < 400) {
      setNotes((prevNotes) => {
        return prevNotes.filter((prevNote) => prevNote.id !== note.id);
      });
    } else {
      alert('Something went wrong while deleting note');
    }
  };

  return (
    <div className={styles.contentModule}>
      <div className={styles.moduleWrapper}>
        <Icon name='list ul' className={styles.moduleIcon} />
        <div className={styles.moduleHeader}>Notes</div>
        <NoteAdd onCreate={onCreate} />
        <div className={styles.wrapper}>
          <Comment.Group>
            {notes
              .sort((note1, note2) => {
                return note1.changeDate < note2.changeDate ? -1 : 0;
              })
              .map((note) => (
                <ItemNote
                  key={note.id}
                  note={note}
                  user={'Firstname Surname'}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))}
          </Comment.Group>
        </div>
      </div>
    </div>
  );
}

Notes.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default Notes;
