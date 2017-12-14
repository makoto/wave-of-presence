import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

const GuestPanel = (props) => {
  let result;
  switch (props.stage) {
    case 'login':
      result = (
        <div>
          <h2>Guest: </h2>
        </div>
      )
      break;
    case 'checkin':
      result = (
        <div>
          <h2>Guest: {props.host} </h2>
          <RaisedButton label="Check in as a guest" secondary={true}
            onClick={()=>{
              props.event.emit('stage', 'confirm')
            }}
          />
        </div>
      )
      break;
    case 'confirm':
      result = (
        <div>
          <h2>Guest: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
        </div>
      )
      break;
    case 'next':
      result = (
        <div>
          <h2>Guest: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
          is checked in.
        </div>
      )
      break;
    default:
      result = (
        <div></div>
      )

  }
  return result;
}
export default GuestPanel;
