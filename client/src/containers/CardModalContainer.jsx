import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { push } from '../lib/redux-router';

import selectors from '../selectors';
import entryActions from '../entry-actions';
import Paths from '../constants/Paths';
import CardModal from '../components/CardModal';

const mapStateToProps = (state) => {
  const allProjectsToLists = selectors.selectProjectsToListsForCurrentUser(state);
  const allLabels = selectors.selectLabelsForCurrentBoard(state);

  const {
    name,
    description,
    dueDate,
    isSubscribed,
    isActivitiesFetching,
    isAllActivitiesFetched,
    isActivitiesDetailsVisible,
    isActivitiesDetailsFetching
  } = selectors.selectCurrentCard(state);

  const labels = selectors.selectLabelsForCurrentCard(state);
  const tasks = selectors.selectTasksForCurrentCard(state);
  const attachments = selectors.selectAttachmentsForCurrentCard(state);
  const activities = selectors.selectActivitiesForCurrentCard(state);

  return {
    name,
    description,
    dueDate,
    isSubscribed,
    isActivitiesFetching,
    isAllActivitiesFetched,
    isActivitiesDetailsVisible,
    isActivitiesDetailsFetching,
    labels,
    tasks,
    attachments,
    activities,
    allProjectsToLists,
    allLabels
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUpdate: entryActions.updateCurrentCard,
      onMove: entryActions.moveCurrentCard,
      onTransfer: entryActions.transferCurrentCard,
      onDelete: entryActions.deleteCurrentCard,
      onBoardFetch: entryActions.fetchBoard,
      onLabelAdd: entryActions.addLabelToCurrentCard,
      onLabelRemove: entryActions.removeLabelFromCurrentCard,
      onLabelCreate: entryActions.createLabelInCurrentBoard,
      onLabelUpdate: entryActions.updateLabel,
      onLabelMove: entryActions.moveLabel,
      onLabelDelete: entryActions.deleteLabel,
      onTaskCreate: entryActions.createTaskInCurrentCard,
      onTaskUpdate: entryActions.updateTask,
      onTaskMove: entryActions.moveTask,
      onTaskDelete: entryActions.deleteTask,
      onAttachmentCreate: entryActions.createAttachmentInCurrentCard,
      onAttachmentUpdate: entryActions.updateAttachment,
      onAttachmentDelete: entryActions.deleteAttachment,
      onActivitiesFetch: entryActions.fetchActivitiesInCurrentCard,
      onActivitiesDetailsToggle: entryActions.toggleActivitiesDetailsInCurrentCard,
      onCommentActivityCreate: entryActions.createCommentActivityInCurrentCard,
      onCommentActivityUpdate: entryActions.updateCommentActivity,
      onCommentActivityDelete: entryActions.deleteCommentActivity,
      push,
    },
    dispatch,
  );

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...omit(dispatchProps, 'push'),
  onClose: () => dispatchProps.push(Paths.ROOT),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CardModal);
