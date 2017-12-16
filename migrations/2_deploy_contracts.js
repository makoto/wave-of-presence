var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var WaveOfPresence = artifacts.require("./WaveOfPresence.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(WaveOfPresence, 0x0);
};
