import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const ButtonGroup = React.forwardRef((props, ref) => {
  const env = {
    state_activeID  : useActiveState(),
    direction       : (props.direction) ? props.direction : 'horizontal',
    listDisaled     : (props.listDisaled?.length) ? props.listDisaled : [],
    childrenDisaled : (props.childrenDisaled?.length) ? props.childrenDisaled : [],
    styleObj        : formatCamelCase(props.styleObj || {}),
  };

  function _onEntryClick(id, content) {
    env.state_activeID.onChange(id);
    if (typeof props.onEntryClick != 'undefined') {
      props.onEntryClick(id, content);
    }
  }

  useEffect(() => {
    env.state_activeID.onChange(props.activeID || props.defaultActiveID || '');
  }, []);

  useEffect(() => {
    if (typeof props.activeID != 'undefined') {
      if (env.state_activeID.value !== props.activeID) {
        env.state_activeID.onChange(props.activeID);
      }
    }
  });

  return (
    <div ref={ref} className={classnames('btb-react-button-group', props.className, `group-${env.direction}`)} style={getStyle(env.styleObj, ['btb-react-button-group', `group-${env.direction}`])}>
      {
        (props.buttonList) ?
          (
            props.buttonList.map((member, index) => {
              return (
                <button className={classnames('group_button', { 'button-disabled' : env.listDisaled.includes(index) }, `button-list_${index}`, { 'button-active' : env.state_activeID.value === `list_${index}` })} disabled={env.listDisaled.includes(index)} style={getStyle(env.styleObj, ['group_button', `button-list_${index}`, (env.state_activeID.value === index) ? 'button-active' : ''])} key={`${Date.now()}_list_${index}`} onClick={() => { _onEntryClick(`list_${index}`, member); }}>
                  {member}
                </button>
              );
            })
          ) : []
      }
      {
        (props.children) ?
          (
            props.children.map((member, index) => {
              return (
                <button className={classnames('group_button', { 'button-disabled' : env.childrenDisaled.includes(index) }, `button-children_${index}`, { 'button-active' : env.state_activeID.value === `children_${index}` })} disabled={env.childrenDisaled.includes(index)} style={getStyle(env.styleObj, ['group_button', `button-children_${index}`])} key={`${Date.now()}_children_${index}`} onClick={() => { _onEntryClick(`children_${index}`, member); }}>
                  {member}
                </button>
              );
            })
          ) : []
      }
      {
        ((!props.buttonList) && (!props.children)) ?
          (
            <button className="group_button button-empty" style={getStyle(env.styleObj, ['group_button', 'button-empty'])}>
              {'Empty'}
            </button>
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