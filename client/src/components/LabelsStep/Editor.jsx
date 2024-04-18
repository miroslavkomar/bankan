import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'semantic-ui-react';
import { Input } from '../../lib/custom-ui';

import LabelColors from '../../constants/LabelColors';

import './Editor.css';
import '../../styles.css';

const Editor = React.memo(({ data, onFieldChange }) => {

  const nameField = useRef(null);

  useEffect(() => {
    nameField.current.select();
  }, []);

  return (
    <>
      <div className="text">{('common.title')}</div>
      <Input
        fluid
        ref={nameField}
        name="name"
        value={data.name}
        className="field"
        onChange={onFieldChange}
      />
      <div className="text">{('common.color')}</div>
      <div className="colorButtons">
        {LabelColors.map((color) => (
          <Button
            key={color}
            type="button"
            name="color"
            value={color}
            className={classNames(
              "colorButton",
              color === data.color && "colorButtonActive",
              `background${upperFirst(camelCase(color))}`,
            )}
            onClick={onFieldChange}
          />
        ))}
      </div>
    </>
  );
});

Editor.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onFieldChange: PropTypes.func.isRequired,
};

export default Editor;
