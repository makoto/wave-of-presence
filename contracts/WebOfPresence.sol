pragma solidity ^0.4.18;

contract WebOfPresence {
  enum Trust { None, Full }

  struct Claim {
    bool present;
		address _host;
    Trust trust;
	}
  mapping (address => Claim) public claims;

  function WebOfPresence(address _host){
    claims[_host] = Claim(true, 0x0, Trust.Full);
  }

  function confirm(address _guest, Trust _trust) public {
    require(isTrusted(msg.sender));
    claims[_guest] = Claim(true, msg.sender, _trust);
  }

  function isPresent(address _guest) public view returns (bool) {
    return claims[_guest].present;
  }

  function isTrusted(address _guest) public view returns (bool) {
    return claims[_guest].trust == Trust.Full;
  }
}

/*0x14723a09acff6d2a60dcdf7aa4aff308fddc160c
0xca35b7d915458ef540ade6068dfe2f44e8fa733c*/
