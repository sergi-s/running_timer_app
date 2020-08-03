import React from "react";

function Card(props) {
  return (
    <div className='note'>
      <div className='top'>
        <h2 className='name'>Started: {props.Started}</h2>
      </div>
      <div className='bottom'>
        <h2 className='name'>Time: {props.Time}</h2>
        <h2 className='name'>Time: {props.State}</h2>
      </div>
    </div>
  );
}
export default Card;
