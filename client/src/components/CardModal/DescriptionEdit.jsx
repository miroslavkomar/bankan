import PropTypes from 'prop-types';
import {Form, TextArea} from 'semantic-ui-react';

import './DescriptionEdit.module.css';
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Activities/CommentAdd.module.css";

function DescriptionEdit ({ defaultValue }) {

  return (
      <Form>
        <TextArea
            as={TextareaAutosize}
            name="text"
            placeholder={'Add more detailed description'}
            minRows={3}
            spellCheck={false}
            className={styles.field}
        />
      </Form>
  );
}

DescriptionEdit.propTypes = {
  defaultValue: PropTypes.string
};

DescriptionEdit.defaultProps = {
  defaultValue: undefined,
};

export default DescriptionEdit;
