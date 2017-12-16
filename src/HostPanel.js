import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { web3, uport } from './utils/uportSetup.js'

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
             uport.requestCredentials({
               requested: ['name', 'avatar'],
               notifications: true // We want this if we want to recieve credentials
             })
             .then((credentials) => {
               props.event.emit('stage', {
                 stage: 'checkin',
                 host:credentials.name,
                 host_avatar_uri:credentials.avatar.uri,
                 host_address:credentials.address,
               })
             })
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
              props.event.emit('stage', {stage:'proof'})
            }}
          />
        </div>
      )
      break;
    case 'proof':
      result = (
        <div>
          <h2>Host: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
          <RaisedButton label="Issue an proof" primary={true}
            onClick={()=>{
              uport.attestCredentials({
                sub: props.user_address,
                claim: { "Proof Of Presence": "You have attended DevCon4" },
                notifcations: true,
              }).then((a,b)=>{
                console.log('attested', a,b)
                props.event.emit('stage', {stage:'next'})
              })
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
              props.event.emit('stage', {stage:'checkin'})
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
