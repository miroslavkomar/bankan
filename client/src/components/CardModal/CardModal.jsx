import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Grid, Icon, Modal } from 'semantic-ui-react';
import { usePopup } from '../../lib/popup';
import { Markdown } from '../../lib/custom-ui';

import NameField from './NameField';
import DescriptionEdit from './DescriptionEdit';
import Tasks from './Tasks';
import Activities from './Activities';
import Label from '../Label';
import DueDate from '../DueDate';
import LabelsStep from '../LabelsStep';
import DueDateEditStep from '../DueDateEditStep';
import DeleteStep from '../DeleteStep';

import styles from './CardModal.css';

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
    tasks,
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
      <Grid className={styles.grid}>
        <Grid.Row className={styles.headerPadding}>
          <Grid.Column width={16} className={styles.headerPadding}>
            <div className={styles.headerWrapper}>
              <Icon name="list alternate outline" className={styles.moduleIcon} />
              <div className={styles.headerTitleWrapper}>
                {canEdit ? (
                  <NameField defaultValue={name} onUpdate={handleNameUpdate} />
                ) : (
                  <div className={styles.headerTitle}>{name}</div>
                )}
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className={styles.modalPadding}>
          <Grid.Column width={canEdit ? 12 : 16} className={styles.contentPadding}>
                {labels.length > 0 && (
                  <div className={styles.attachments}>
                    <div className={styles.text}>
                      {('common.labels', {
                        context: 'title',
                      })}
                    </div>
                    {labels.map((label) => (
                      <span key={label.id} className={styles.attachment}>
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
                          className={classNames(styles.attachment, styles.dueDate)}
                        >
                          <Icon name="add" size="small" className={styles.addAttachment} />
                        </button>
                      </LabelsPopup>
                    )}
                  </div>
                )}
                {dueDate && (
                  <div className={styles.attachments}>
                    <div className={styles.text}>
                      {('common.dueDate', {
                        context: 'title',
                      })}
                    </div>
                    <span className={styles.attachment}>
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
              <div className={styles.contentModule}>
                <div className={styles.moduleWrapper}>
                  <Icon name="align justify" className={styles.moduleIcon} />
                  <div className={styles.moduleHeader}>{('common.description')}</div>
                  {canEdit ? (
                    <DescriptionEdit defaultValue={description} onUpdate={handleDescriptionUpdate}>
                      {description ? (
                        <button
                          type="button"
                          className={classNames(styles.descriptionText, styles.cursorPointer)}
                        >
                          <Markdown linkStopPropagation linkTarget="_blank">
                            {description}
                          </Markdown>
                        </button>
                      ) : (
                        <button type="button" className={styles.descriptionButton}>
                          <span className={styles.descriptionButtonText}>
                            {('action.addMoreDetailedDescription')}
                          </span>
                        </button>
                      )}
                    </DescriptionEdit>
                  ) : (
                    <div className={styles.descriptionText}>
                      <Markdown linkStopPropagation linkTarget="_blank">
                        {description}
                      </Markdown>
                    </div>
                  )}
                </div>
              </div>
            )}
            {(tasks.length > 0 || canEdit) && (
              <div className={styles.contentModule}>
                <div className={styles.moduleWrapper}>
                  <Icon name="check square outline" className={styles.moduleIcon} />
                  <div className={styles.moduleHeader}>{('common.tasks')}</div>
                  <Tasks
                    items={tasks}
                    canEdit={canEdit}
                    onCreate={onTaskCreate}
                    onUpdate={onTaskUpdate}
                    onMove={onTaskMove}
                    onDelete={onTaskDelete}
                  />
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
            <Grid.Column width={4} className={styles.sidebarPadding}>
              <div className={styles.actions}>
                <span className={styles.actionsTitle}>{('action.addToCard')}</span>
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
                  <Button fluid className={styles.actionButton}>
                    <Icon name="bookmark outline" className={styles.actionIcon} />
                    {('common.labels')}
                  </Button>
                </LabelsPopup>
                <DueDateEditPopup defaultValue={dueDate} onUpdate={handleDueDateUpdate}>
                  <Button fluid className={styles.actionButton}>
                    <Icon name="calendar check outline" className={styles.actionIcon} />
                    {('common.dueDate', {
                      context: 'title',
                    })}
                  </Button>
                </DueDateEditPopup>
              </div>
              <div className={styles.actions}>
                <span className={styles.actionsTitle}>{('common.actions')}</span>
                <Button
                  fluid
                  className={styles.actionButton}
                  onClick={handleToggleSubscriptionClick}
                >
                  <Icon name="paper plane outline" className={styles.actionIcon} />
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
                    className={styles.actionButton}
                    onClick={handleToggleSubscriptionClick}
                  >
                    <Icon name="share square outline" className={styles.actionIcon} />
                    {('action.move')}
                  </Button>
                </CardMovePopup>
                <DeletePopup
                  title="common.deleteCard"
                  content="common.areYouSureYouWantToDeleteThisCard"
                  buttonContent="action.deleteCard"
                  onConfirm={onDelete}
                >
                  <Button fluid className={styles.actionButton}>
                    <Icon name="trash alternate outline" className={styles.actionIcon} />
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
      <Modal open closeIcon centered={false} onClose={handleClose} className={styles.wrapper}>
        {canEdit ? (
          <AttachmentAddZone onCreate={onAttachmentCreate}>{contentNode}</AttachmentAddZone>
        ) : (
          contentNode
        )}
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
  tasks: PropTypes.array.isRequired,
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
