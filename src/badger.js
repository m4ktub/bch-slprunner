let badger;
if (typeof web4bch !== "undefined") {
  badger = new window.Web4Bch(window.web4bch.currentProvider);
}

function hasBadger() {
  return !!badger;
}

function isUnlocked() {
  return hasBadger() && !!badger.bch.defaultAccount;
}

function requestSend(address, callback) {
  if (!isUnlocked()) return;

  let options = {
    to: address,
    from: badger.bch.defaultAccount,
    value: "1000"
  };

  badger.bch.sendTransaction(options, callback);
}

function requestTokenSend(address, tokenId, callback) {
  if (!isUnlocked()) return;

  let options = {
    to: address,
    from: badger.bch.defaultAccount,
    value: "1",
    sendTokenData: {
      tokenId: tokenId,
      tokenProtocol: "slp"
    }
  };

  badger.bch.sendTransaction(options, callback);
}

export default {
  hasBadger,
  isUnlocked,
  requestSend,
  requestTokenSend
};
