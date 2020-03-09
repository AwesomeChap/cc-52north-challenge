import React, { useState } from 'react';
import _ from 'lodash';

const ControlBar = (props) => {
  const [display, setDisplay] = useState(false);
  const mamOptions = ['Min', 'Avg', 'Max'];

  let menuToggleButtonText = display ? 'Hide Controls' : 'Show Controls';
  let controlBarClasses = display ? 'control-bar' : 'control-bar hide';

  const updateMAM = (selectedOption) => {
    props.updateMAM(selectedOption);
  }

  const updatePhenomenon = (selectedOption) => {
    props.updatePhenomenon(selectedOption);
  }

  return (
    <>
      <div className="control-bar-wrapper">
        <div onClick={()=>setDisplay(!display)} className="menu-toggle-btn">{menuToggleButtonText}</div>
        <div className={controlBarClasses}>
          <div className="mam-options">
            {mamOptions.map((mamOption) => {
              let classes = [];
              const key = _.camelCase(mamOption);
              if (key === props.MAM) {
                classes.push('selected');
              }
              return <span key={key} onClick={() => updateMAM(key)} className={classes.join(' ')}>{mamOption}</span>
            })}
          </div>
          <div className="ttl">~ ~ ~ ~ Phenomenons ~ ~ ~ ~</div>
          <div className="phenomenons">
            {props.phenomenons.map(ph => {
              let classes = [];
              const key = _.camelCase(ph.name);
              if (key === props.phenomenon) {
                classes.push('selected');
              }
              return (
                <span className="phenomenon" key={key} onClick={() => updatePhenomenon(key)} className={classes.join(' ')}>{ph.name}</span>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ControlBar;