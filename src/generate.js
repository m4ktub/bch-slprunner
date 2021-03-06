const SLPSDK = require("slp-sdk");
const SLP = new SLPSDK({ restURL: "https://rest.bitcoin.com/v2/" });

const rootSeed = SLP.Mnemonic.toSeed(
  "march mimic december feature august winner sand fault sleep phone just social"
);

const masterHDNode = SLP.HDNode.fromSeed(rootSeed);
const account = SLP.HDNode.derivePath(masterHDNode, "m/44'/245'/0'");

let keyNode = SLP.HDNode.derivePath(account, "0/0");
let keyPair = SLP.HDNode.toKeyPair(keyNode);
let keyWif = SLP.HDNode.toWIF(keyNode);
let bchAddress = SLP.HDNode.toCashAddress(keyNode);
let slpAddress = SLP.Address.toSLPAddress(bchAddress);
let btcAddress = SLP.Address.toLegacyAddress(bchAddress);

function pad(num) {
    var s = "000" + num;
    return s.substr(s.length-3);
}

async function create(level) {
    let batonNode = SLP.HDNode.derivePath(account, "1/" + level);
    let batonPair = SLP.HDNode.toKeyPair(batonNode);
    let batonBchAddress = SLP.HDNode.toCashAddress(batonNode);
    let batonSlpAddress = SLP.Address.toSLPAddress(batonBchAddress);

    let token = await SLP.TokenType1.create({
        fundingAddress: bchAddress,
        fundingWif: keyWif,
        tokenReceiverAddress: bchAddress,
        batonReceiverAddress: batonSlpAddress,
        bchChangeReceiverAddress: bchAddress,
        decimals: 0,
        name: `Lode Runner Level ${level} Resume`,
        symbol: 'LVL' + pad(level),
        documentUri: null,
        documentHash: null,
        initialTokenQty: 0,
    });
    
    console.log(`"${token}": ${level},`);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// this will take 75 minutes and may fail with { error: '64: too-long-mempool-chain' }
let p = new Promise(resolve => resolve());
for (var level = 1; level <= 150; level++) {
  p = p.then(create.bind(this, level)).then(timeout.bind(this, 30000));
}

p.catch(error => console.log(error));
