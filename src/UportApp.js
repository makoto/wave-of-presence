import { Connect, SimpleSigner } from 'uport-connect'
import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

class UportApp extends Component {
  constructor(props) {
    super(props)
    console.log('constructor')
    const uport = new Connect('WaveOfPresence', {
      clientId: '2oueY3Rx7vtiRZ77cWQiAjVG9YKkJgwQDFi',
      network: 'rinkeby',
      signer: SimpleSigner('060fae1ca6ecbd00fa766d200c8cad5988ad2f7e6f7b3832b2667031763e1927')
    })
    alert('requestCredentials');
    // Request credentials to login
    uport.requestCredentials({
      requested: ['name', 'country', 'avatar'],
      notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
      console.log('attestCredentials')
      // debugger;
      alert(credentials.address);
      // return uport.attestCredentials({
      //   sub: credentials.address,
      //   claim: { 'foo': 'bar' },
      // })
    })
    .then((response, a, b) => {
      console.log('response', response, a, b)
      debugger;
    })

    this.state = {
      web3: null
    }
  }
}

// Attest specific credentials
// uport.attestCredentials({
//   sub: THE_RECEIVING_UPORT_ADDRESS,
//   claim: {
//     CREDENTIAL_NAME: CREDENTIAL_VALUE
//   },
//   exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
// })


export default UportApp
