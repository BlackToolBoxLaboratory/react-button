import React from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const Button = React.forwardRef((props, ref) => {
  const env = {
    styleObj : formatCamelCase(props.styleObj || {})
  };

  function _onButtonClick () {
    if (typeof props.onClick != 'undefined') {
      props.onClick(props);
    }
  }
  function _onPrependClick () {
    if (typeof props.onPrependClick != 'undefined') {
      props.onPrependClick(props);
    }
  }
  function _onCoreClick () {
    if (typeof props.onCoreClick != 'undefined') {
      props.onCoreClick(props);
    }
  }
  function _onAppendClick () {
    if (typeof props.onAppendClick != 'undefined') {
      props.onAppendClick(props);
    }
  }

  return (
    <div ref={ref} className={classnames('btb-react-button', props.className)} style={getStyle(env.styleObj, ['btb-react-button'])} onClick={_onButtonClick}>
      {
        (props.prependNode)?
          (
            <div className="button_item item-prepend" style={getStyle(env.styleObj, ['button_item', 'item-prepend'])} onClick={_onPrependClick}>
              { props.prependNode }
            </div>
          ) : []
      }
      <div className="button_item itme-core" style={getStyle(env.styleObj, ['button_item', 'itme-core'])} onClick={_onCoreClick}>
        { props.children || 'Button' }
      </div>
      {
        (props.appendNode)?
          (
            <div className="button_item item-append" style={getStyle(env.styleObj, ['button_item', 'item-append'])} onClick={_onAppendClick}>
              { props.appendNode }
            </div>
          ) : []
      }
    </div>
  );
});

export default Button;