pragma solidity ^0.4.18;

contract WebOfPresence {
  struct Claim {
    bool present;
		address _host;
    int trust;
	}
  mapping (address => Claim) public claims;

  function WebOfPresence(address _host){
    claims[_host] = Claim(true, 0x0, 3);
  }

  function confirm(address _guest, int _trust) public {
    require(isPresent(msg.sender));
    claims[_guest] = Claim(true, msg.sender, _trust);
  }

  function isPresent(address _guest) public view returns (bool) {
    return claims[_guest].present;
  }
}
