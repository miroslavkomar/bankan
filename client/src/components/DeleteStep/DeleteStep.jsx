import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';

import './DeleteStep.module.css';

const DeleteStep = React.memo(
  ({ title, content, buttonContent, onConfirm, onBack }) => {
    return (
      <>
        <Popup.Header onBack={onBack}>{title}</Popup.Header>
        <Popup.Content>
          <div className='content'>{content}</div>
          <Button fluid negative content={buttonContent} onClick={onConfirm} />
        </Popup.Content>
      </>
    );
  }
);

DeleteStep.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func
};

DeleteStep.defaultProps = {
  onBack: undefined
};

export default DeleteStep;
