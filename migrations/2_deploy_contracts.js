var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var WebOfPresence = artifacts.require("./WebOfPresence.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(WebOfPresence, 0x0);
};
