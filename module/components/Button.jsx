import React from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const Button = React.forwardRef((props, ref) => {
  const env = {
    styleObj : formatCamelCase(props.styleObj || {})
  };

  function _onButtonClick() {
    if (typeof props.onClick != 'undefined' || props.disabled) {
      props.onClick(props);
    }
  }
  function _onPrependClick() {
    if (typeof props.onPrependClick != 'undefined' || props.disabled) {
      props.onPrependClick(props);
    }
  }
  function _onCoreClick() {
    if (typeof props.onCoreClick != 'undefined' || props.disabled) {
      props.onCoreClick(props);
    }
  }
  function _onAppendClick() {
    if (typeof props.onAppendClick != 'undefined' || props.disabled) {
      props.onAppendClick(props);
    }
  }

  return (
    <button ref={ref} className={classnames('btb-react-button', { 'button-disabled' : props.disabled }, props.className)} disabled={props.disabled} style={getStyle(env.styleObj, ['btb-react-button'])} onClick={_onButtonClick}>
      {
        (props.prependNode) ?
          (
            <div className="button_item item-prepend" style={getStyle(env.styleObj, ['button_item', 'item-prepend'])} onClick={_onPrependClick}>
              {props.prependNode}
            </div>
          ) : []
      }
      <div className="button_item itme-core" style={getStyle(env.styleObj, ['button_item', 'itme-core'])} onClick={_onCoreClick}>
        {props.children || 'Button'}
      </div>
      {
        (props.appendNode) ?
          (
            <div className="button_item item-append" style={getStyle(env.styleObj, ['button_item', 'item-append'])} onClick={_onAppendClick}>
              {props.appendNode}
            </div>
          ) : []
      }
    </button>
  );
});

export default Button;