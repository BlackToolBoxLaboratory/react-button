import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const ButtonGroup = React.forwardRef((props, ref) => {
  const env = {
    state_activeID : useActiveState(),
    direction      : (props.direction)? props.direction : 'horizontal',
    styleObj       : formatCamelCase(props.styleObj || {}),
    slotObj        : props.slotObj || {}
  };

  function _onEntryClick (id, content) {
    env.state_activeID.onChange(id);
    if (typeof props.onEntryClick != 'undefined') {
      props.onEntryClick(id, content);
    }
  }
  
  useEffect(() => {
    env.state_activeID.onChange(props.activeID || props.defaultActiveID || '');
  }, []);

  useEffect(() => {
    if (typeof props.activeID != 'undefined')
    {
      if (env.state_activeID.value !== props.activeID)
      {
        env.state_activeID.onChange(props.activeID);
      }
    }
  });

  return (
    <div ref={ref} className={classnames('btb-react-button-group', props.className, `group-${env.direction}`)} style={getStyle(env.styleObj, ['btb-react-button-group', `group-${env.direction}`])}>
      {
        (props.buttonList)?
          (
            props.buttonList.map((member, index) => {
              return (
                <div className={classnames('group_button', `button-list_${index}`, {'button-active' : env.state_activeID.value === `list_${index}`})} style={getStyle(env.styleObj, ['group_button', `button-list_${index}`, (env.state_activeID.value === index)? 'button-active':''])} key={`${Date.now()}_list_${index}`} onClick={() => {_onEntryClick(`list_${index}`, member);}}>
                  {member}
                </div>
              );
            })
          ) : []
      }
      {
        (props.children)?
          (
            props.children.map((member, index) => {
              return (
                <div className={classnames('group_button', `button-children_${index}`, {'button-active' : env.state_activeID.value === `children_${index}`})} style={getStyle(env.styleObj, ['group_button', `button-children_${index}`])} key={`${Date.now()}_children_${index}`} onClick={() => {_onEntryClick(`children_${index}`, member);}}>
                  {member}
                </div>
              );
            })
          ) : []
      }
      {
        ((!props.buttonList) && (!props.children)) ? 
          (
            <div className="group_button button-empty" style={getStyle(env.styleObj, ['group_button', 'button-empty'])}>
              {'Empty'}
            </div>
          ) : []
      }
    </div>
  );
});

function useActiveState(defaultSate) {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    onChange : (state) => {
      setState(state);
    }
  };
}

export default ButtonGroup;