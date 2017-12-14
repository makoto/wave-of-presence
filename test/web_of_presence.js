const WebOfPresence = artifacts.require("./WebOfPresence.sol");

contract('WebOfPresence', function(accounts) {
  let presence;
  const host = accounts[0];
  const volunteer = accounts[1];
  const guest = accounts[2];

  it("host is present by default", async function() {
    presence = await WebOfPresence.new(host);
    assert.equal((await presence.isPresent.call(host)), true);
    assert.equal((await presence.isTrusted.call(host)), true);
    assert.equal((await presence.isPresent.call(volunteer)), false);
    assert.equal((await presence.isTrusted.call(volunteer)), false);
    assert.equal((await presence.isPresent.call(guest)), false);
    assert.equal((await presence.isTrusted.call(guest)), false);
  });

  describe('on confirm', function(){
    beforeEach(async function(){
      presence = await WebOfPresence.new(host);
    })

    it("host can confirm attendance", async function() {
      await presence.confirm(volunteer, 1, {from:host});
      assert.equal((await presence.isPresent.call(volunteer)), true);
    });

    it("volunteer can not confirm unless confirmed first", async function() {
      assert.equal((await presence.isPresent.call(volunteer)), false);
      await presence.confirm(guest, 1, {from:volunteer}).catch(function(){});
      assert.equal((await presence.isPresent.call(guest)), false);
    });

    it("volunteer can confirm once confirmed", async function() {
      await presence.confirm(volunteer, 1, {from:host});
      assert.equal((await presence.isPresent.call(volunteer)), true);
      assert.equal((await presence.isTrusted.call(volunteer)), true);
      presence.confirm(guest, 1, {from:volunteer});
      assert.equal((await presence.isPresent.call(guest)), true);
    });
  })
});
