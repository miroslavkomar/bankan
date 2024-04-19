import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import { usePopup } from '../../lib/popup';
import { Markdown } from '../../lib/custom-ui';

import NameField from './NameField';
import DescriptionEdit from './DescriptionEdit';
import Activities from './Activities';
import Label from '../Label';
import DueDate from '../DueDate';
import CardMoveStep from "../CardMoveStep";
import LabelsStep from '../LabelsStep';
import DueDateEditStep from '../DueDateEditStep';
import DeleteStep from '../DeleteStep';

import './CardModal.css';

const CardModal = React.memo(
  ({
    name,
    description,
    dueDate,
    isSubscribed,
    isActivitiesFetching,
    isAllActivitiesFetched,
    isActivitiesDetailsVisible,
    isActivitiesDetailsFetching,
    listId,
    boardId,
    projectId,
    labels,
    activities,
    allProjectsToLists,
    allLabels,
    canEdit,
    canEditCommentActivities,
    canEditAllCommentActivities,
    onUpdate,
    onMove,
    onTransfer,
    onDelete,
    onLabelAdd,
    onLabelRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelMove,
    onLabelDelete,
    onTaskCreate,
    onTaskUpdate,
    onTaskMove,
    onTaskDelete,
    onActivitiesFetch,
    onActivitiesDetailsToggle,
    onCommentActivityCreate,
    onCommentActivityUpdate,
    onCommentActivityDelete,
    onClose,
  }) => {
    const isGalleryOpened = useRef(false);

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleDescriptionUpdate = useCallback(
      (newDescription) => {
        onUpdate({
          description: newDescription,
        });
      },
      [onUpdate],
    );

    const handleDueDateUpdate = useCallback(
      (newDueDate) => {
        onUpdate({
          dueDate: newDueDate,
        });
      },
      [onUpdate],
    );


    const handleToggleSubscriptionClick = useCallback(() => {
      onUpdate({
        isSubscribed: !isSubscribed,
      });
    }, [isSubscribed, onUpdate]);

    const handleClose = useCallback(() => {
      if (isGalleryOpened.current) {
        return;
      }

      onClose();
    }, [onClose]);

    const LabelsPopup = usePopup(LabelsStep);
    const DueDateEditPopup = usePopup(DueDateEditStep);
    const CardMovePopup = usePopup(CardMoveStep);
    const DeletePopup = usePopup(DeleteStep);

    const labelIds = labels.map((label) => label.id);

    const contentNode = (
      <Grid className="grid">
        <Grid.Row className="headerPadding">
          <Grid.Column width={16} className="headerPadding">
            <div className="headerWrapper">
              <Icon name="list alternate outline" className="moduleIcon" />
              <div className="headerTitleWrapper">
                {canEdit ? (
                  <NameField defaultValue={name} onUpdate={handleNameUpdate} />
                ) : (
                  <div className="headerTitle">{name}</div>
                )}
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="modalPadding">
          <Grid.Column width={canEdit ? 12 : 16} className="contentPadding">
                {labels.length > 0 && (
                  <div className="attachments">
                    <div className="text">
                      {('common.labels', {
                        context: 'title',
                      })}
                    </div>
                    {labels.map((label) => (
                      <span key={label.id} className="attachment">
                        {canEdit ? (
                          <LabelsPopup
                            key={label.id}
                            items={allLabels}
                            currentIds={labelIds}
                            onSelect={onLabelAdd}
                            onDeselect={onLabelRemove}
                            onCreate={onLabelCreate}
                            onUpdate={onLabelUpdate}
                            onMove={onLabelMove}
                            onDelete={onLabelDelete}
                          >
                            <Label name={label.name} color={label.color} />
                          </LabelsPopup>
                        ) : (
                          <Label name={label.name} color={label.color} />
                        )}
                      </span>
                    ))}
                    {canEdit && (
                      <LabelsPopup
                        items={allLabels}
                        currentIds={labelIds}
                        onSelect={onLabelAdd}
                        onDeselect={onLabelRemove}
                        onCreate={onLabelCreate}
                        onUpdate={onLabelUpdate}
                        onMove={onLabelMove}
                        onDelete={onLabelDelete}
                      >
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <button
                          type="button"
                          className={classNames("attachment", "dueDate")}
                        >
                          <Icon name="add" size="small" className="addAttachment" />
                        </button>
                      </LabelsPopup>
                    )}
                  </div>
                )}
                {dueDate && (
                  <div className="attachments">
                    <div className="text">
                      {('common.dueDate', {
                        context: 'title',
                      })}
                    </div>
                    <span className="attachment">
                      {canEdit ? (
                        <DueDateEditPopup defaultValue={dueDate} onUpdate={handleDueDateUpdate}>
                          <DueDate value={dueDate} />
                        </DueDateEditPopup>
                      ) : (
                        <DueDate value={dueDate} />
                      )}
                    </span>
                  </div>
                )}
            {(description || canEdit) && (
              <div className="contentModule">
                <div className="moduleWrapper">
                  <Icon name="align justify" className="moduleIcon" />
                  <div className="moduleHeader">{('common.description')}</div>
                  {canEdit ? (
                    <DescriptionEdit defaultValue={description} onUpdate={handleDescriptionUpdate}>
                      {description ? (
                        <button
                          type="button"
                          className={classNames("descriptionText", "cursorPointer")}
                        >
                          <Markdown linkStopPropagation linkTarget="_blank">
                            {description}
                          </Markdown>
                        </button>
                      ) : (
                        <button type="button" className="descriptionButton">
                          <span className="descriptionButtonText">
                            {('action.addMoreDetailedDescription')}
                          </span>
                        </button>
                      )}
                    </DescriptionEdit>
                  ) : (
                    <div className="descriptionText">
                      <Markdown linkStopPropagation linkTarget="_blank">
                        {description}
                      </Markdown>
                    </div>
                  )}
                </div>
              </div>
            )}
            <Activities
              items={activities}
              isFetching={isActivitiesFetching}
              isAllFetched={isAllActivitiesFetched}
              isDetailsVisible={isActivitiesDetailsVisible}
              isDetailsFetching={isActivitiesDetailsFetching}
              canEdit={canEditCommentActivities}
              canEditAllComments={canEditAllCommentActivities}
              onFetch={onActivitiesFetch}
              onDetailsToggle={onActivitiesDetailsToggle}
              onCommentCreate={onCommentActivityCreate}
              onCommentUpdate={onCommentActivityUpdate}
              onCommentDelete={onCommentActivityDelete}
            />
          </Grid.Column>
          {canEdit && (
            <Grid.Column width={4} className="sidebarPadding">
              <div className="actions">
                <span className="actionsTitle">{('action.addToCard')}</span>
                <LabelsPopup
                  items={allLabels}
                  currentIds={labelIds}
                  onSelect={onLabelAdd}
                  onDeselect={onLabelRemove}
                  onCreate={onLabelCreate}
                  onUpdate={onLabelUpdate}
                  onMove={onLabelMove}
                  onDelete={onLabelDelete}
                >
                  <Button fluid className="actionButton">
                    <Icon name="bookmark outline" className="actionIcon" />
                    {('common.labels')}
                  </Button>
                </LabelsPopup>
                <DueDateEditPopup defaultValue={dueDate} onUpdate={handleDueDateUpdate}>
                  <Button fluid className="actionButton">
                    <Icon name="calendar check outline" className="actionIcon" />
                    {('common.dueDate', {
                      context: 'title',
                    })}
                  </Button>
                </DueDateEditPopup>
              </div>
              <div className="actions">
                <span className="actionsTitle">{('common.actions')}</span>
                <Button
                  fluid
                  className="actionButton"
                  onClick={handleToggleSubscriptionClick}
                >
                  <Icon name="paper plane outline" className="actionIcon" />
                  {isSubscribed ? ('action.unsubscribe') : ('action.subscribe')}
                </Button>
                <CardMovePopup
                  projectsToLists={allProjectsToLists}
                  defaultPath={{
                    projectId,
                    boardId,
                    listId,
                  }}
                  onMove={onMove}
                  onTransfer={onTransfer}
                >
                  <Button
                    fluid
                    className="actionButton"
                    onClick={handleToggleSubscriptionClick}
                  >
                    <Icon name="share square outline" className="actionIcon" />
                    {('action.move')}
                  </Button>
                </CardMovePopup>
                <DeletePopup
                  title="common.deleteCard"
                  content="common.areYouSureYouWantToDeleteThisCard"
                  buttonContent="action.deleteCard"
                  onConfirm={onDelete}
                >
                  <Button fluid className="actionButton">
                    <Icon name="trash alternate outline" className="actionIcon" />
                    {('action.delete')}
                  </Button>
                </DeletePopup>
              </div>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );

    return (
      <Modal open closeIcon centered={false} onClose={handleClose} className="modalWrapper">
        canEdit ? (
          contentNode
        )
      </Modal>
    );
  },
);

CardModal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  dueDate: PropTypes.instanceOf(Date),
  isSubscribed: PropTypes.bool.isRequired,
  isActivitiesFetching: PropTypes.bool.isRequired,
  isAllActivitiesFetched: PropTypes.bool.isRequired,
  isActivitiesDetailsVisible: PropTypes.bool.isRequired,
  isActivitiesDetailsFetching: PropTypes.bool.isRequired,
  listId: PropTypes.string.isRequired,
  /* eslint-disable react/forbid-prop-types */
  labels: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
  allProjectsToLists: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  canEdit: PropTypes.bool.isRequired,
  canEditCommentActivities: PropTypes.bool.isRequired,
  canEditAllCommentActivities: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelMove: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  onTaskCreate: PropTypes.func.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onTaskMove: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onActivitiesFetch: PropTypes.func.isRequired,
  onActivitiesDetailsToggle: PropTypes.func.isRequired,
  onCommentActivityCreate: PropTypes.func.isRequired,
  onCommentActivityUpdate: PropTypes.func.isRequired,
  onCommentActivityDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

CardModal.defaultProps = {
  description: undefined,
  dueDate: undefined,
};

export default CardModal;
