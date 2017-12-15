import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { Connect, SimpleSigner, MNID } from 'uport-connect'

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
              const uport2 = new Connect('BlockParty', {
                clientId: '2oueY3Rx7vtiRZ77cWQiAjVG9YKkJgwQDFi',
                network: 'rinkeby',
                signer: SimpleSigner('060fae1ca6ecbd00fa766d200c8cad5988ad2f7e6f7b3832b2667031763e1927')
              })
              uport2.requestCredentials({
                requested: ['name', 'avatar'],
                notifications: true // We want this if we want to recieve credentials
              })
              .then((credentials) => {
                props.event.emit('stage', {
                  stage: 'confirm',
                  guest:credentials.name,
                  guest_avatar_uri:credentials.avatar.uri,
                  guest_address:credentials.address,
                })
              })
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
    case 'proof':
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
    case 'next':
      result = (
        <div>
          <h2>Guest: {props.user} </h2>
          <div>
            <Avatar src={props.user_avatar_uri} size="100" />
          </div>
          got a proof of presence.
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
