import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import selectors from '../selectors';
import entryActions from '../entry-actions';
import Board from '../components/Board/Board';

const mapStateToProps = (state) => {
  const { cardId } = selectors.selectPath(state);

  return {
    isCardModalOpened: !!cardId,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onListCreate: entryActions.createListInCurrentBoard,
      onListMove: entryActions.moveList,
      onCardMove: entryActions.moveCard,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Board({true}));
