import { Slp } from "slpjs";
const BigNumber = require("bignumber.js");
const SLPSDK = require("slp-sdk");
const SLP = new SLPSDK({ restURL: "https://rest.bitcoin.com/v2/" });

const rootSeed = SLP.Mnemonic.toSeed(
  "march mimic december feature august winner sand fault sleep phone just social"
);
const masterHDNode = SLP.HDNode.fromSeed(rootSeed);
const account = SLP.HDNode.derivePath(masterHDNode, "m/44'/245'/0'");

let number = Math.trunc(Math.random() * 10000);
let keyNode = SLP.HDNode.derivePath(account, "0/" + number);
let keyPair = SLP.HDNode.toKeyPair(keyNode);
let bchAddress = SLP.HDNode.toCashAddress(keyNode);
let slpAddress = SLP.Address.toSLPAddress(bchAddress);
let btcAddress = SLP.Address.toLegacyAddress(bchAddress);

const levels = {
  "d5efb237f43a822ede2086bbefca44f1157b7adf2ddeed87c4b294bd136d1d36": 1,
  "d8298b47d2b8beab3c200a2f5d18c4014fa883f9a831468b3fca8ec9e51a535f": 2,
  "fd83ca5cf39fc7e9a0bcdb3fc00cbdd3980a30871a1fcdd580e2e2a41caf1ab0": 3,
  "f87861d6e068a17cf3ca223a7518571c4a1109cec8fc3a51be1a56420ddf2816": 4,
  "578920b290c147911d8fb4e7f981065f3f9f344ae42a20dd056b7deb2158e484": 5,
  "1c93b5cdc6d0e064ee5f9134f3184855daf630e6e7b97c7b9391d5e775460a1a": 6,
  "0bd5d7ba772e9b2952df6e3c0d551fa1caf8db91cd51b14df5546a12bae5917b": 7,
  "848f3677b69afc0d002fcbe8ab02c8dcfb17f54ae779bd895c77de9a608b345a": 8,
  "3a904bf3a58b49ab51432230e55d230ad13cd934cc435953435160aecc3a6e9b": 9,
  "0d02b95fa0765db9eed2ed958bec4aa51391106783de3f795a0efddace2b2c50": 10,
  "da6899513788f6eda9c3bdb6865f7053884056c65e2ce9d8fb1ffd8647488adf": 11,
  "1c067b37540ae1f8eedff013f226992cf55ba390a7b4ce01c491539e77538266": 12,
  "40249b3b7540f7ec6a35e15499815b9467d4c57056b1f1e0f3b745383986c735": 13,
  "f26d9fb7cc3cab8b7f26fa4b3124f35abdb0b0250ae4e726582c14371fcab103": 14,
  "4fa4210389e70fc67d2c7bd3f442c185fbc129705d366fb0b22168dfc69b3d65": 15,
  "f9f87392c1dab30bd58652260ec80db1e7570c6b22da9b99f3ac93598904dfa0": 16,
  "f5a811ac1dd364d18dc39614d76006e502afa6d2b33b9f778045a6db756b7a65": 17,
  "02859836fdb3a12b7c8e21fb853d0b71000ead4a18138fca9d359a5fad71f186": 18,
  "6710c21e9056d7f0b6fcf95bcc5c3f98a8fff9d2792af4ad9a3ef6c348027092": 19,
  "7d7d131e30a15c3412c39b633dbc44c5e86761c507406a00bd3550318f11e3b5": 20,
  "cdebae277c8550f075fdfb8d67e58755e52f04b53ce107b5542f0434bbc873bb": 21,
  "cc4f19c0ca3ec740cb3d8c7d5d999b22f9eee3e9bea470e7d121ee10976e7dfb": 22,
  "191ed342875aae021d2fb75859ef9788b77ed1d334e5ca2a7890f175163c777e": 23,
  "947f0d3b09490475fc994ca3e9783e8ad76fd205f7968fda1e7bca4c03d67b38": 24,
  "317725f769b2de8f43705c76e25a8db319f7679aec71a7977fa2c5244fae696d": 25,
  "a357cbecf5403be65ca47b82f76ba2ece035b8db6c3b1c02286f7379ecfd6097": 26,
  "f6c832e264b17814043fb6836feb5077259ba5812cae6bf3d5a71c0173324e1f": 27,
  "f93010140241cdc06fb335af42cfc74ead7ee02671d4d1b26701d90dbe9102ad": 28,
  "b9c5441a92a4c351e9224def1f78da6618551e388eb51b342f12a90f0246926a": 29,
  "0c4040228dd1b9247423c1e19fa057307eec24b1cdcc0b239391a6eaade0d821": 30,
  "8f41465dafc11605027f876f5c6c3ff3acf3e78ab4f99ac451f0c93c8a7bc39f": 31,
  "3641fc50120b604e4020ab8930f10f687b886db4280fb94a35f25ef4b891bb49": 32,
  "74a911155b24f146e5ff19bc4cd401ac03029182a839bfe86ada4d6ebe413b31": 33,
  "f60b41cab4c76d9b6a58d671b057032ab170e2d68bdbd2d6f4bd2ea4b328e79d": 34,
  "5524eec1f452fb1025fc61f19c241bd15a4ac6a3801cde7d8f8b50f7e38ae71e": 35,
  "4d9533da6d33af52b3c2a0a5b558e5248f33177584edf104b5ff6b879b0de4a0": 36,
  "74d71af7eadcca0ada1769294f3fba76a7d7a43951697926dd03131a2c99125a": 37,
  "4dc9c7dd34646b84de367509bd6ecae8afe37e1d51e269fb34f2bfe45d872a20": 38,
  "e5801d00f42d571441b8ff1fd7db496262aaade80544b9fb77b17cf9e69ca8ce": 39,
  "91b038f60456a380915f594f7b1fe7bb622bd2c892c16ad4865d25bc0dbf8927": 40,
  "9ee69feb5b588459d3fe30a871d9a9efce6340f5ff928108de9c7f351c016b81": 41,
  "a61b1191e04da996b69e536aee80dfe88cfb7aaa017e7e8b5aa44c7399740b4c": 42,
  "c4d10c1b1d2786f9fca4cedd0e468bc64b6b62adad1090c8d3dc785dc6d53cab": 43,
  "e53cacc72d3a4007f0e69ac39d51bfee1a980d69f21a0db9e13b553c9729c43d": 44,
  "e6680c83296e9418726fc5d5323b8bdc04939e85b4782f74f224606caccee473": 45,
  "ef3ab63746878a307e2c09ea76f45b2d290d4885326142fd1cd321c3bf851f36": 46,
  "269f4c99b01c0b4780b97964a766568e0af025adfdc9e68a43563be47f967b06": 47,
  "367ce34e2a6a4474cadc9c68dcfd36a7d8e371abedf000f3b89c6cfc4d69685e": 48,
  "4223d944d7d5aaa7bf5616cd4db24c82ac29da7b6508d7aca93670b27b5f417f": 49,
  "2d4e638a4aa2a0f6a85b0db6873260fe3343d171ec757cef722eec271d7b2f38": 50,
  "4ef519ca79c8db5659c10794e5089b995696d8437498fb60268024d740116f2b": 51,
  "204784bd7029d4cc5e294fe0cf926d28f1f514c583a89b1aab67dceadaa82d69": 52,
  "a98cb1853066c3195e037824b49e1e5e1eadf33170003bf1e39417eca0556c26": 53,
  "5b61fa72b5126b2bd82970dd84ad1d03ec0ab05f6e92c4b014b61678c414f8ea": 54,
  "f5e4cd8daa7cce0ade1cced47c7532f4026bbc64502ba076aa1f54e042c144be": 55,
  "b905c45a18043dd2b9e5b755911ff1798dbb3f5372498644e5b7701bca8f53af": 56,
  "74550c26b1982e14bfcda545a6cf1421a0e77788e4483d0e4b77c499d2d832ef": 57,
  "08ec573e2bc96374d8d0aa836be9043a0b80b79ff66e7fd3284d19a2f72cabf2": 58,
  "fb3a4984697f042d7cc67782b38f3cdf8ea22e846b990087d71e70ed3fdf6fff": 59,
  "a18eafdc2e5684d9aa5c71192311347b782cec2882f4834d1ddf8552f9dc039a": 60,
  "cdb490f99e12f0f1cd051df72bd39273f21b64984b1e1f2a341e5c27bf3b94a2": 61,
  "34b312f8c5ea31d03937f97b6649e4001e3f334ec3bf72625fe28f9b393e149e": 62,
  "929f2e3d7e583e9f223bc04d822fb07d274120130a7e71f7275513706809f290": 63,
  "a1315a4ac2950527322689085d2b631bf5c9c140d136190d6dcb0347ae54c4c1": 64,
  "64710285d461b20e1674c05095c51dd9cba17f85ec872217d3fd08cf603bb395": 65,
  "d83c83e7adccc42e078737d5f7c322ee415090ca747b39621f7701f1b6844e19": 66,
  "34d34ac1682c2a4939d7bd50ed9f5b9c20df66293b9eb55d9cf4069095b54b73": 67,
  "a53f69c666bf557fe711ccd9210602e11bcf41751b9fcff1a39f6730cfe8a0dd": 68,
  "e7b6d8ce2ebe1ad5c84bcd52629b0f8a54b73869a2fdbdf0ef02e3aa96373c07": 69,
  "e948c97b69f8ab575d3e702eca1da97d06d6272b154edd7374d6360a1c160e99": 70,
  "b12757c4ec1b46ea8980b1488330ef8d6059d6b3744339022e7aa0381befc1cf": 71,
  "d1ba21b1e87473d9e6d1e32baea1ab5818d29539c81c13191f5273d2f7d3c053": 72,
  "72b9916c651efd1f4c88b2df9d3f2a47192d4aeaed6d69ee0281ef05302affa1": 73,
  "18120345c99bdca4aa1e9d3bfd58a6703d1280083dfa96c7dc9d2280d3cd20b0": 74,
  "81ff8aa9fba93dcba55209bd73d9cb4041653feb9ac38fcb9bb5a4dabeb5249a": 75,
  "4160f56c601d18fd35f319a47044dc8c6216807c5fa662a6d7820eaecaee7e24": 76,
  "778d819abec3cd11bd3aab69f2e2aac8580597cefcd89ebf1980e3802f01b6e1": 77,
  "cc95d34d01fff83a083eb78d07b05addc46732ce951ea44fa41f3cccfc086a3b": 78,
  "dc3cc8933955205b1bfa45a739c2e1d0e6a39ea537876c34875d87e5ef06924b": 79,
  "4810735e999df3d57910c779470ea0776b649ebfc99ffcd1bb40ea63e0e2a1c7": 80,
  "077d625e460dc360579cb14c1b2818391c322db1813f68023f25ed77353477d5": 81,
  "9e41773544490ed27f7876521d5e0aba51eaee1fab21e8548baa10faae30ea92": 82,
  "9bbff2c7a3604d95a3e8b829e329b6afd122dfde4786fea1c79dfd96cafb9e2a": 83,
  "2c19d9fc541bfdaa25099a562f296673239a0046f9080143f500eb5546efeb18": 84,
  "f385a6653b0d36910ee55f47b9cd1dfb04f3b5193005bf69a29908caf920df07": 85,
  "30b02ab9e42f87c785db920e8a6660ab6091cb3863d7465a9f94a4925eef9222": 86,
  "2371c4b318349e62a339d59ccfcff745277a97b6ee221a31f50f3a0a009663c1": 87,
  "e1bd2e36dafdba40b6af0605e36a12d279ffd6e0ed5b5a1151efd4c6f30707c4": 88,
  "73d2064c0753ce26091433941208a1f7ebf0092641f1cd85a2e1d66bebbba2e3": 89,
  "74092120fcca8b996b49a2983fce15a22a074a2bb6b35087eee18cc27e6b36c4": 90,
  "5d2e84201101ba9805de08bab288b839b141b65c013f28fbdf55f90aec5b1927": 91,
  "e54c571a0b17ac44083870bcbd0446bfe9b7dc3f5ff0fcb9d7d50cbddfaa6c97": 92,
  "1633f8ccdab8e6be86ed50c4116ce486cb3f0a5625d556bcae333375bc681a88": 93,
  "9d753320fdb73c08abdf448ab24e2fbe64b5bfaff3d1552a81a5f94f4420e73d": 94,
  "97b62d99c877ca8c4b1e74abbd43731c8aa172ec0c644bb1411748fdbb8ed14e": 95,
  "65c2c8aad8e6c44d086ef1cbb1fd705e5a3b80fce7ea1198fa33b25d63596457": 96,
  "5a329dc0573b654ec6cb50a12bd8ad677b38505d491f6e76f291309864e1f525": 97,
  "bd2c2a8a104e77f6f3242d6a3679dc92458f9ba47aacf2549cd08136ff1dda12": 98,
  "d1a8406aad71aa283d820a14acdcc30bc266ddc04eddebf83d7a23e05bfe2ec5": 99,
  "c0028fb9c5ffa08a3eaa61d5bd9071affcf2d2a8c1d4979e98e5d9abb77633df": 100,
  "a317accbbfe0d82a53e57d458ac4afa2b115dd9f3e4f304220361131797f7eb2": 101,
  "eccc38105d96bc54688038a2cd0d8bdc2d80882e98a9dc3accc672746070ea2f": 102,
  "8b13cf18968fc93d93806c36e1160e2e402f9c2932617400870af75a5b966b9a": 103,
  "05dffbbfe82023d63dc8199696240d4b87bf64ab52d688c08f9162b6f7ce5d1d": 104,
  "47c46ab424b6cb4b3a104cc5c939ca6b0092acaba16a9c3dfa8005ca404cc206": 105,
  "444f94fe8c0b96f567c27698b8c123287a5bf066234217ab33b05825441e7296": 106,
  "d77b580e5fd958cd2e72e0f72fc075ed480e88ef40d21159218e189e9fbacedc": 107,
  "a1584193b79aad7a5c848ecad05fff9eeb5132576ddd8f7b086c9b115b774da3": 108,
  "7decaf6f63915dfd69087ec62e4db77ceb01d5db72b7ea5fc5855246cabad28a": 109,
  "2586d4dcde727602c2d7b4f5c8a073e6f65612e125ae11e99c221c3e0876ed24": 110,
  "f63e647215ade6575073514a17ae8d16c059e5d83dfe6ca541112d43be2585cc": 111,
  "34b9338d0cb9bbf6f9a1319d1a533a3638efda0bfea3db2ddabcb8103f06bf17": 112,
  "10ceb986b7af3931e59dc0aca383419c3299cc33ddd05134e923737a61ca8a5c": 113,
  "0e702be114a61376b00c970e53531e5ab5f8cf614c29eb5bf467547295e89e09": 114,
  "b241c44149937f99f4101e3accb5ea59750b6e05ab749dd685f92ab0a868ead8": 115,
  "b51c73d2afd6bedda013014033450995be351701bd43719383e797c42580f1ca": 116,
  "85b5e14a6c2cb1a39fe9fbba4b5830b8bb666efc4d5bae841062fe4321b7f1f2": 117,
  "c0a7a50cc6f089bdcf0cb8d53f6727870beb25887be420060b489a67db24ad5c": 118,
  "6ad71304eb4e0b2d3024110b97200b1e10812269a39de5d5ac5fbd0521679c5b": 119,
  "4d17e3de553f1af1ea032540db52f75e2ec0dbac3f828d5ca2590b6797cd8b92": 120,
  "b0a817c20be0884f6df701c90063609a3aeca21bcb132c2c26958a1d68a90509": 121,
  "018f9c8ec09447e9f5445457f82e2eebf03021dea97d51c003d182b78261f8fe": 122,
  "771eb266b9e85f9ea0f7aa926ddad0f03d399e00c21320852180b99ca8fcff49": 123,
  "4d785739d8c8dc48f37f894e112961cce573c444cb1c036cc5df2bda84c79bd4": 124,
  "a022b9ba05db0ff754cd4dfe60a405432d3f21ad058040dd05befcdda529ac84": 125,
  "2f81289f4201ac18560ffe3a0828e7adb230c8473b2750d8ef8bf4525653857b": 126,
  "2a949b0e4c8a635c13f0dae58fe0c10e15111375d8bd00222da268c334e470f0": 127,
  "c752a5a484bc816b0431203be00142160208ab9d127ae2fb18553012e6f2b663": 128,
  "3de9802926897f750059381315b7ba35289f2bcdd93dc213eca0f0b7ec82680e": 129,
  "5e3401a788d607c7f58bc1ac3dc1fcb8b93ca1c2edfda5805d6bc2fb29caf57e": 130,
  "886b34f5c1a31a83d87084cd00399c5ca9c225e793465a2f496d907dfd7188b6": 131,
  "fba27ddd2a9313b6d404330684add2b697d07da7291efef56d0d52a7b2d25cc6": 132,
  "42a80610cbe84d88401237653c70494b58ebe16e224b3b962168186d43b70a34": 133,
  "bec6b3734a5800d358d4b82973c3cc70d558b7025eee17afb5c767176b95c070": 134,
  "b86ba5eb9b7e382dc5c45f4fe5867d6f21b08a6def0f4694932064a86624d4a0": 135,
  "77efa1eaa7941a5c86cac8d51d8207ec15d93a9fb1d2370b7c741b0b1140e920": 136,
  "0ef7480dbd930b45ef3e5d8f1dd8c2195aee6c2d78fd329d9fc07a3b3d32ba74": 137,
  "3efeaa2ac0d8936e2a0bfc2ed7a4d904b04618a4f6ff74d48008437864c055bf": 138,
  "f45b9251c83c2d8c041836148c1949fbbcbfc41ebbfcc6d3f9d406778929263a": 139,
  "cda23504897337246b9be7deecb57d3ce17fe6a5626fb0e4ade82d4f345211f5": 140,
  "87168a6bce9698cbb4d524e9694ae2c1b40e567738a3c597e1cf3b8bd9215c0d": 141,
  "9bae1e06deb1271bbe1b1b361df9be2ef100228d681a83cb5538ce75ce19580e": 142,
  "8ab2681a66b90333adc2d1db461183f4393bcc217ed1d26324d102c02a52a6ea": 143,
  "5dbb519370bf71188890234e0a7823139bb2e18faf7a819cc6ea90e3779cc47d": 144,
  "0d3dfd840483b2b8b94c0714446578d0f5a33a3dd021c5c41d11a4874a93f30a": 145,
  "154694c1b0f90583cf0c64866e0710293fb0f933994495154c12a5a66fe94394": 146,
  "0d550e75ceff4ac5a6ef18add53f2fd8b165af7a65a33434bbcd5d52c31d3a8e": 147,
  "d244888bddc5c0ff080599198e588f22bafc82b84078ecf41fef71d62f8d9bca": 148,
  "dc3ba2c61415d8f69e7abc18536080b34f13f58fe201d515a58fba13ae207d54": 149,
  "1f9b883ed36251004e4bb8774ef206f225628947c5912e42deb7e1c6c7d0af2e": 150
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTxDetailsWithRetry(txid, times, interval) {
  let attempts = times;
  do {
    attempts--;

    try {
      return await SLP.Transaction.details(txid);
    } catch (error) {
      if (attempts > 0) {
        console.log(error);
        await timeout(interval);
      } else {
        throw error;
      }
    }
  } while (attempts > 0);
}

async function getAddressBalancesWithRetry(slpAddress, times, interval) {
  let attempts = times || 1;
  do {
    attempts--;

    let balances = await SLP.Utils.balancesForAddress(slpAddress);
    if (Array.isArray(balances) && balances.length) {
      return balances;
    } else if (attempts <= 0) {
      return [];
    } else {
      await timeout(interval || 1000);
    }
  } while (attempts > 0);
}

async function burn(txid, vout, satoshis, callback) {
  // sanity checks to avoid burning whale money
  if (satoshis > 546) {
    console.log(`transaction ${txid} deposited more than 546 sats`);
    return;
  }

  // balance check
  // [{"tokenId":"0d02b95fa0765db9eed2ed958bec4aa51391106783de3f795a0efddace2b2c50","balance":"1","decimalCount":0}]
  let balances = await getAddressBalancesWithRetry(slpAddress, 60, 2000);
  if (!balances.length) {
    console.log(`transaction ${txid} deposited no tokens`);
    callback(1, 1); // error out by going to the first level
    return;
  }

  let tokenId = balances[0].tokenId;
  let tokenBalance = balances.reduce((acc, v) => acc + parseInt(v.balance), 0);
  let tokenLevel = levels[tokenId];

  if (!tokenLevel) {
    console.log(`transaction ${txid} does not contain a LVL token`);
    return;
  }

  if (tokenBalance == 0) {
    console.log(`transaction ${txid} tried to trick me with a 0 balance`);
    return;
  }

  // build transaction
  let txBuilder = new SLP.TransactionBuilder();
  txBuilder.addInput(txid, vout);

  let burnData = SLP.Script.encode([
    SLP.Script.opcodes.OP_RETURN,
    new Buffer("Puff! There goes the token.")
  ]);
  txBuilder.addOutput(burnData, 0);

  let redeemScript;
  txBuilder.sign(
    0,
    keyPair,
    redeemScript,
    txBuilder.hashTypes.SIGHASH_ALL,
    satoshis
  );

  let newTx = txBuilder.build();
  let newTxHex = newTx.toHex();
  let newTxId = await SLP.RawTransactions.sendRawTransaction([newTxHex]);
  console.log(`Burn Tx ID: ${newTxId}`);

  // invoke callback
  callback(tokenLevel, tokenBalance);
}

async function sendBackToken(txid, level, callback) {
  try {
    // get transaction details and matching output
    let userTx = await getTxDetailsWithRetry(txid, 30, 2000);
    let userOut = userTx.vout
      .filter(o => o.scriptPubKey.addresses)
      .find(o => o.scriptPubKey.addresses.indexOf(btcAddress) >= 0);

    if (!userOut) {
      callback("error: no valid output", null);
      return;
    }

    // check funding balance
    let satoshis = Math.trunc(parseFloat(userOut.value) * 100000000);
    if (satoshis < 1000) {
      callback("error: not enough satoshis to cover expenses", null);
      return;
    }

    // guess input user address
    let userAddress = userTx.vin[0].cashAddress;

    // get token id for level
    let tokenId = Object.keys(levels).find(tokenId => levels[tokenId] == level);
    if (!tokenId) {
      callback("error: could not find token id for level " + level, null);
      return;
    }

    // get minting baton address for the level
    let batonNode = SLP.HDNode.derivePath(account, "1/" + level);
    let batonPair = SLP.HDNode.toKeyPair(batonNode);
    let batonBchAddress = SLP.HDNode.toCashAddress(batonNode);

    // get baton output
    let batonUtxos = await SLP.Address.utxo(batonBchAddress);
    let batonOut = batonUtxos.utxos.find(utxo => utxo.satoshis == 546);

    // build transaction
    let slp = new Slp(SLP);
    let mintOpReturn = slp.buildMintOpReturn({
      tokenIdHex: tokenId,
      mintQuantity: new BigNumber(1),
      batonVout: 2
    });

    let txBuilder = new SLP.TransactionBuilder();
    txBuilder.addInput(userTx.txid, userOut.n);
    txBuilder.addInput(batonOut.txid, batonOut.vout);
    txBuilder.addOutput(mintOpReturn, 0);
    txBuilder.addOutput(userAddress, 546);
    txBuilder.addOutput(batonBchAddress, 546);

    const SIGHASH_ALL = txBuilder.hashTypes.SIGHASH_ALL;

    let redeemScript;
    txBuilder.sign(0, keyPair, redeemScript, SIGHASH_ALL, satoshis);
    txBuilder.sign(1, batonPair, redeemScript, SIGHASH_ALL, 546);

    // send transaction
    let newTx = txBuilder.build();
    let newTxHex = newTx.toHex();
    let newTxId = await SLP.RawTransactions.sendRawTransaction([newTxHex]);
    console.log(`Mint Tx ID: ${newTxId}`);

    // result
    callback(null, newTxId);
  } catch (error) {
    callback(error, null);
  }
}

async function getUserLevels(userAddress, callback) {
  try {
    let userSlpAddress = SLP.Address.toSLPAddress(userAddress);
    let balances = await getAddressBalancesWithRetry(userSlpAddress);
    let lvlBalances = balances
      .filter(balance => {
        let lvl = levels[balance.tokenId];
        return lvl && parseInt(balance.balance) > 0;
      })
      .map(balance => balance.tokenId);

    callback(null, lvlBalances);
  } catch (error) {
    callback(error, null);
  }
}

function toLegacyAddress(address) {
  return SLP.Address.toLegacyAddress(address);
}

export default {
  SLP,
  bchAddress,
  slpAddress,
  btcAddress,
  levels,
  burn,
  sendBackToken,
  getUserLevels,
  toLegacyAddress
};
