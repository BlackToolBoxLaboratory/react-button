import React from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const ButtonGroup = React.forwardRef((props, ref) => {
  const env = {
    direction : (props.direction)? props.direction : 'horizontal',
    styleObj  : formatCamelCase(props.styleObj || {})
  };

  function _onGroupClick () {
    if (typeof props.onClick != 'undefined') {
      props.onClick(props);
    }
  }

  return (
    <div ref={ref} className={classnames('btb-react-button-group', props.className, `group-${env.direction}`)} style={getStyle(env.styleObj, ['btb-react-button-group', `group-${env.direction}`])} onClick={_onGroupClick}>
      {
        (props.children)?
          (
            props.children.map((member, index) => {
              return (
                <div className={classnames('group_member', `member-${index}`)} style={getStyle(env.styleObj, ['group_member', `member-${index}`])} key={`${Date.now()}_${index}`}>
                  {member}
                </div>
              );
            })
          ): (
            <div className="group_member member-empty" style={getStyle(env.styleObj, ['group_member', 'member-empty'])}>
              {'Empty'}
            </div>
          )
      }
    </div>
  );
});

export default ButtonGroup;