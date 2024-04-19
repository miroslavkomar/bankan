import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Button, Dropdown, Form} from 'semantic-ui-react';
import {Popup} from '../../lib/custom-ui';

import {useForm} from '../../hooks';

import './CardMoveStep.module.css';

const CardMoveStep = React.memo(
  ({ projectsToLists, defaultPath, onMove, onTransfer, onBoardFetch, onBack, onClose }) => {

    const [path, handleFieldChange] = useForm(() => ({
      projectId: null,
      boardId: null,
      listId: null,
      ...defaultPath,
    }));

    const selectedProject = useMemo(
      () => projectsToLists.find((project) => project.id === path.projectId) || null,
      [projectsToLists, path.projectId],
    );

    const selectedBoard = useMemo(
      () =>
        (selectedProject && selectedProject.boards.find((board) => board.id === path.boardId)) ||
        null,
      [selectedProject, path.boardId],
    );

    const selectedList = useMemo(
      () => (selectedBoard && selectedBoard.lists.find((list) => list.id === path.listId)) || null,
      [selectedBoard, path.listId],
    );

    const handleBoardIdChange = useCallback(
      (event, data) => {
        if (selectedProject.boards.find((board) => board.id === data.value).isFetching === null) {
          onBoardFetch(data.value);
        }

        handleFieldChange(event, data);
      },
      [onBoardFetch, handleFieldChange, selectedProject],
    );

    const handleSubmit = useCallback(() => {
      if (selectedBoard.id !== defaultPath.boardId) {
        onTransfer(selectedBoard.id, selectedList.id);
      } else if (selectedList.id !== defaultPath.listId) {
        onMove(selectedList.id);
      }

      onClose();
    }, [defaultPath, onMove, onTransfer, onClose, selectedBoard, selectedList]);

    return (
      <>
        <Popup.Header onBack={onBack}>
          {('common.moveCard', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          <Form onSubmit={handleSubmit}>
            <div className="text">{'common.project'}</div>
            <Dropdown
              fluid
              selection
              name="projectId"
              options={projectsToLists.map((project) => ({
                text: project.name,
                value: project.id,
              }))}
              value={selectedProject && selectedProject.id}
              placeholder={
                projectsToLists.length === 0 ? ('common.noProjects') : ('common.selectProject')
              }
              disabled={projectsToLists.length === 0}
              className="field"
              onChange={handleFieldChange}
            />
            {selectedProject && (
              <>
                <div className="text">{'common.board'}</div>
                <Dropdown
                  fluid
                  selection
                  name="boardId"
                  options={selectedProject.boards.map((board) => ({
                    text: board.name,
                    value: board.id,
                  }))}
                  value={selectedBoard && selectedBoard.id}
                  placeholder={
                    selectedProject.boards.length === 0
                      ? ('common.noBoards')
                      : ('common.selectBoard')
                  }
                  disabled={selectedProject.boards.length === 0}
                  className="field"
                  onChange={handleBoardIdChange}
                />
              </>
            )}
            {selectedBoard && (
              <>
                <div className="text">{('common.list')}</div>
                <Dropdown
                  fluid
                  selection
                  name="listId"
                  options={selectedBoard.lists.map((list) => ({
                    text: list.name,
                    value: list.id,
                  }))}
                  value={selectedList && selectedList.id}
                  placeholder={
                    selectedBoard.isFetching === false && selectedBoard.lists.length === 0
                      ? ('common.noLists')
                      : ('common.selectList')
                  }
                  loading={selectedBoard.isFetching !== false}
                  disabled={selectedBoard.isFetching !== false || selectedBoard.lists.length === 0}
                  className="field"
                  onChange={handleFieldChange}
                />
              </>
            )}
            <Button
              positive
              content={('action.move')}
              disabled={(selectedBoard && selectedBoard.isFetching !== false) || !selectedList}
            />
          </Form>
        </Popup.Content>
      </>
    );
  },
);

CardMoveStep.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  projectsToLists: PropTypes.array.isRequired,
  defaultPath: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onMove: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onBoardFetch: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

CardMoveStep.defaultProps = {
  onBack: undefined,
};

export default CardMoveStep;
