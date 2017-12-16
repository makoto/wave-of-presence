const WaveOfPresence = artifacts.require("./WaveOfPresence.sol");
const Trust = {None:0, Full:1};

function awaitEvent(event, handler) {
  return new Promise((resolve, reject) => {
    function wrappedHandler(...args) {
      Promise.resolve(handler(...args)).then(resolve).catch(reject);
    }
    event.watch(wrappedHandler);
  });
}
contract('WaveOfPresence', function(accounts) {
  let presence;
  const host = accounts[0];
  const volunteer = accounts[1];
  const guest = accounts[2];

  it("host is present by default", async function() {
    presence = await WaveOfPresence.new(host);
    assert.equal((await presence.isPresent.call(host)), true);
    assert.equal((await presence.isTrusted.call(host)), true);
    assert.equal((await presence.isPresent.call(volunteer)), false);
    assert.equal((await presence.isTrusted.call(volunteer)), false);
    assert.equal((await presence.isPresent.call(guest)), false);
    assert.equal((await presence.isTrusted.call(guest)), false);
  });

  describe('on confirm', function(){
    beforeEach(async function(){
      presence = await WaveOfPresence.new(host);
    })

    it("host can confirm attendance", async function() {
      await presence.confirm(volunteer, Trust.Full, {from:host});
      assert.equal((await presence.isPresent.call(volunteer)), true);
    });

    it("volunteer can not confirm unless confirmed first", async function() {
      assert.equal((await presence.isPresent.call(volunteer)), false);
      await presence.confirm(guest, Trust.Full, {from:volunteer}).catch(function(){});
      assert.equal((await presence.isPresent.call(guest)), false);
    });

    it("volunteer can confirm once confirmed", async function() {
      await presence.confirm(volunteer, Trust.Full, {from:host});
      assert.equal((await presence.isPresent.call(volunteer)), true);
      assert.equal((await presence.isTrusted.call(volunteer)), true);
      presence.confirm(guest, Trust.Full, {from:volunteer});
      assert.equal((await presence.isPresent.call(guest)), true);
    });

    it("guest cannot confirm without trust", async function() {
      await presence.confirm(guest, Trust.None, {from:host});
      assert.equal((await presence.isPresent.call(guest)), true);
      assert.equal((await presence.isTrusted.call(guest)), false);
      presence.confirm(volunteer, Trust.Full, {from:guest}).catch(function(){});
      assert.equal((await presence.isPresent.call(volunteer)), false);
    });
  })
});
