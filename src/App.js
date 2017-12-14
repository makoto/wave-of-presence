import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

const waves = [
  'M480 608c-42.944 0-85.92-16.352-118.624-49.024-40.512-40.48-106.336-40.448-146.752 0-12.512 12.512-32.736 12.512-45.248 0s-12.512-32.736 0-45.248c65.376-65.376 171.808-65.376 237.248 0 40.48 40.448 106.304 40.416 146.752 0 12.512-12.512 32.736-12.512 45.248 0s12.512 32.736 0 45.248c-32.672 32.672-75.648 49.024-118.624 49.024z',
  'M480 480c-42.944 0-85.92-16.352-118.624-49.024-40.512-40.48-106.336-40.448-146.752 0-12.512 12.512-32.736 12.512-45.248 0s-12.512-32.736 0-45.248c65.376-65.376 171.808-65.376 237.248 0 40.48 40.448 106.304 40.416 146.752 0 12.512-12.512 32.736-12.512 45.248 0s12.512 32.736 0 45.248c-32.672 32.672-75.648 49.024-118.624 49.024z',
  'M480 352c-42.944 0-85.92-16.352-118.624-49.024-40.512-40.48-106.336-40.448-146.752 0-12.512 12.512-32.736 12.512-45.248 0s-12.512-32.736 0-45.248c65.376-65.344 171.808-65.408 237.248 0 40.48 40.448 106.304 40.416 146.752 0 12.512-12.512 32.736-12.512 45.248 0s12.512 32.736 0 45.248c-32.672 32.672-75.648 49.024-118.624 49.024z'
];

const HomeIcon = (props) => (
  <svg width="36" height="36" viewBox="0 0 1024 1024">
    <path fill="#fff" d={waves[0]}></path>
    <path fill="#fff" d={waves[1]}></path>
    <path fill="#fff" d={waves[2]}></path>
  </svg>
);

const HostPanel = (props) => {
  let result;
  switch (props.stage) {
    case 'login':
      result = (
        <div>
          <h2>Host: </h2>
          <RaisedButton label="Log in as a host" primary={true} />
        </div>
      )
      break;
    case 'checkin':
      result = (
        <div>
          <h2>Host: {props.host} </h2>
          <div>
            <Avatar src={props.host_avatar_uri} size="100" />
          </div>
          welcomes you.
        </div>
      )
      break;
    case 'confirm':
      result = (
        <div>
          <h2>Host: {props.host} </h2>
          <div>
            <Avatar src={props.host_avatar_uri} size="100" />
          </div>
          <RaisedButton label="Confirm guest" primary={true} />
        </div>
      )
      break;
    case 'next':
      result = (
        <div>
          <h2>Host: {props.host} </h2>
          <div>
            <Avatar src={props.host_avatar_uri} size="100" />
          </div>
          <RaisedButton label="Welcome next guest" primary={true} />
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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stages: ['checkin', 'confirm', 'next'],
      stage: 'login',
      storageValue: 0,
      host: 'makoto',
      host_avatar_uri: "https://ipfs.infura.io/ipfs/QmNoHv4dx9QkzQHuf1WoNvocDTZBEuoaKQu4EZRRgJ9tAi",
      // guest: 'jeff',
      web3: null
    }
  }

  next(){
    this.setState({stage:this.state.stages.shift()})
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Wave Of Presence"
            iconElementLeft={<IconButton><HomeIcon/></IconButton>}
          />

          <main className="container">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <div>stage: {this.state.stage}</div>
                <HostPanel
                  host={this.state.host} host_avatar_uri={this.state.host_avatar_uri}
                  stage={this.state.stage}
                />
                <h2>Guest: {this.state.guest} </h2>
                  <RaisedButton label="Check in as a guest" secondary={true} />
                  <p>The stored value is: {this.state.storageValue}</p>
              </div>
            </div>
            <RaisedButton label="Next" onClick={this.next.bind(this)} />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
