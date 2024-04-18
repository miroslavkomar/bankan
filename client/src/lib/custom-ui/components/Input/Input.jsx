import { Input as SemanticUIInput } from 'semantic-ui-react';

import InputMask from './InputMask';

export default class Input extends SemanticUIInput {
  static Mask = InputMask;

  focus = (options) => this.inputRef.current.focus(options);
}
