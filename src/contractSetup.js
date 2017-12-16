import { web3 } from './utils/uportSetup.js'

function MyContractSetup () {
  let MyContractABI = web3.eth.contract([
     {
        "constant":true,
        "inputs":[
           {
              "name":"_guest",
              "type":"address"
           }
        ],
        "name":"isPresent",
        "outputs":[
           {
              "name":"",
              "type":"bool"
           }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
     },
     {
        "constant":false,
        "inputs":[
           {
              "name":"_guest",
              "type":"address"
           },
           {
              "name":"_trust",
              "type":"uint8"
           }
        ],
        "name":"confirm",
        "outputs":[

        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "constant":true,
        "inputs":[
           {
              "name":"_guest",
              "type":"address"
           }
        ],
        "name":"isTrusted",
        "outputs":[
           {
              "name":"",
              "type":"bool"
           }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
     },
     {
        "constant":true,
        "inputs":[
           {
              "name":"",
              "type":"address"
           }
        ],
        "name":"claims",
        "outputs":[
           {
              "name":"present",
              "type":"bool"
           },
           {
              "name":"_host",
              "type":"address"
           },
           {
              "name":"trust",
              "type":"uint8"
           }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "name":"_host",
              "type":"address"
           }
        ],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":false,
              "name":"confirming",
              "type":"address"
           },
           {
              "indexed":false,
              "name":"confirmed",
              "type":"address"
           },
           {
              "indexed":false,
              "name":"trust",
              "type":"uint8"
           }
        ],
        "name":"ConfirmedEvent",
        "type":"event"
     }
  ])

  let MyContractObj = MyContractABI.at("0x9718abe8fc4b55aaac2bdc030e9ce54ae0268a6c")
  return MyContractObj
}

export { MyContractSetup }