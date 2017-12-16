import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import { web3, uport } from './utils/uportSetup.js'
import { MNID } from 'uport-connect'
import { MyContractSetup } from './contractSetup.js'
import { waitForMined, pollingLoop } from './utils/contractHandeling.js'
// import { getCurrentDataFromChain } from './utils/utilities.js'

const MyContract = MyContractSetup()
console.log('window.MyContract', window.MyContract)
window.MyContract = MyContract;
const HostPanel = (props) => {
  let result;
  switch (props.stage) {
    case 'login':
      result = (
        <div>
          <RaisedButton
           label="Log in as a host" primary={true}
           onClick={()=>{
             uport.requestCredentials({
               requested: ['name', 'avatar'],
               notifications: true // We want this if we want to recieve credentials
             })
             .then((credentials) => {
               console.log('credentials', credentials);
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
              // let host_address = "0x5a384227b65fa093dec03ec34e111db80a040615"
              let host_address = "2odgxKGQvWfrhaAhJ53dc66tssZkh4j8x9b"
              const decodedId = MNID.decode(host_address).address;
              console.log('decodedId', decodedId);
              let gest_address = ""
              // Transaction signing (that will fire a QR to scan or card in the mobile app)
              MyContract.confirm(decodedId, 1, (error, txHash) => {
                if (error) { throw error }
                  waitForMined(txHash, { blockNumber: null }, // see next area
                  function pendingCB () {
                    // Signal to the user you're still waiting
                    // for a block confirmation
                    console.log("pendingCB")
                  },
                  function successCB (data) {
                    // Great Success!
                    // Likely you'll call some eventPublisherMethod(txHash, data)
                    console.log("success", data);
                    props.event.emit('stage', {stage:'proof'});
                  }
                )
              })
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
