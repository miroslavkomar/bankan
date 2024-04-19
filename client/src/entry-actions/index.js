import core from './core';
import modals from './modals';
import labels from './labels';
import lists from './lists';
import cards from './cards';
import tasks from './tasks';
import attachments from './attachments';
import activities from './activities';
import commentActivities from './comment-activities';
import notifications from './notifications';

export default {
  ...core,
  ...modals,
  ...labels,
  ...lists,
  ...cards,
  ...tasks,
  ...attachments,
  ...activities,
  ...commentActivities,
  ...notifications,
};
