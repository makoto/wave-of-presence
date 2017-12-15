import { Connect, SimpleSigner, MNID } from 'uport-connect'
console.log('uportSetup')
const uport = new Connect('BlockParty', {
  clientId: '2oueY3Rx7vtiRZ77cWQiAjVG9YKkJgwQDFi',
  network: 'rinkeby',
  signer: SimpleSigner('060fae1ca6ecbd00fa766d200c8cad5988ad2f7e6f7b3832b2667031763e1927')
})

const web3 = uport.getWeb3()
export { web3, uport, MNID }
