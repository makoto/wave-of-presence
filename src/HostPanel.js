import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

const HostPanel = (props) => {
  let result;
  switch (props.stage) {
    case 'login':
      result = (
        <div>
          <h2>Host: </h2>
          <RaisedButton
           label="Log in as a host" primary={true}
           onClick={()=>{
             props.event.emit('stage', 'checkin')
           }}
          />
        </div>
      )
      break;
    case 'checkin':
      result = (
        <div>
          <h2>Host: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
          welcomes you.
        </div>
      )
      break;
    case 'confirm':
      result = (
        <div>
          <h2>Host: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
          <RaisedButton label="Confirm guest" primary={true}
            onClick={()=>{
              props.event.emit('stage', 'next')
            }}
          />
        </div>
      )
      break;
    case 'next':
      result = (
        <div>
          <h2>Host: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
          <RaisedButton label="Welcome next guest" primary={true}
            onClick={()=>{
              props.event.emit('stage', 'checkin')
            }}
          />
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
export default HostPanel;
