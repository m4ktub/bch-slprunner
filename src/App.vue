<template>
  <div id="app">
    <div id="startdialog" v-bind:class="startDialogClass">
      <div class="dialog">
        <h2>Play LodeRunner with SLP Tokens</h2>
        <p>With the <a href="badger.bitcoin.com" target="_blank">Badger wallet</a>, just click one of the levels bellow and send the token. If you use Electron Cash SLP you can send any LVL token to the address. You will start playing from that level. <span class="alert">WARNING</span>: Any token sent will be destroyed.</p>
        <div class="levels" v-if="!showProcessingMessage">
          <p><tt>{{ slpAddress }}</tt></p>
          <a v-for="(level, tokenId, index) in levels" :key="tokenId" 
             v-on:click="requestToken(level, tokenId)"
             href="#">{{ level }}</a>
        </div>
        <div class="processing" v-if="showProcessingMessage">
          <p>Processing transaction...</p>
          <tt>{{ txid }}</tt>
        </div>
        <div class="buttons" v-if="!showProcessingMessage">
           <button v-on:click="playGame">Me no tokens. Me play!</button>
        </div>
      </div>
    </div>
    <div id="gameoverdialog" v-bind:class="gameOverDialogClass">
      <div class="dialog">
        <h2>DED!</h2>
        <p>It happens but don't worry. This way you can get a nice LVL token that allows you to start from level {{ gameOverLevel }} directly.</p>
        <p>Pay 1 cent with badger and receive back a resume token. You can also show that token as a badge of merit for reaching this far.</p>
        <p><span class="alert">WARNING</span>: Use the <a href="badger.bitcoin.com" target="_blank">Badger wallet</a> and don't send more than 1 cent.</p>
        <div class="buttons badger" v-if="!showProcessingMessage">
           <button v-on:click="requestPayment" v-bind:disabled="!canBadger" v-bind:title="payButtonTitle">Pay 1 cent</button>
        </div>
        <div class="processing" v-if="showProcessingMessage">
          <p>Processing transaction...</p>
          <tt>{{ txid }}</tt>
        </div>
        <div class="buttons" v-if="!showProcessingMessage">
           <button v-on:click="restartGame">I like to start from level 1</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Socket from "./socket.js";
import wallet from "./wallet.js";
import badger from "./badger.js";

export default {
  name: "app",
  data() {
    return {
      ticker: 1,
      showStartDialog: false,
      showGameOverDialog: false,
      showProcessingMessage: false,
      levels: wallet.levels,
      address: wallet.bchAddress,
      slpAddress: wallet.slpAddress,
      txid: "",
      gameOverLevel: 1,
      processed: []
    };
  },
  mounted() {
    // show start dialog
    this.showStartDialog = true;

    // arm intervals
    this._ticker = window.setInterval(() => this.ticker++, 1000);

    this._gameOverInterval = window.setInterval(
      () => this.checkGameOver(),
      250
    );

    // listen to new transactions
    this._socket = new Socket();
    this._socket.onBlock(block => {
      window.setTimeout(() => {
        this.processed = [];
      }, 5000);
    });
    this._socket.onTransaction(tx => {
      let output = tx.outputs
        .filter(o => o.scriptPubKey.addresses)
        .find(o => o.scriptPubKey.addresses.indexOf(wallet.btcAddress) >= 0);

      if (!output) {
        return;
      }

      // skip already processed transactions
      if (this.processed.includes(tx.format.txid)) {
        return;
      }

      this.processed.push(tx.format.txid);
      this.showProcessingMessage = true;
      this.txid = tx.format.txid;
      
      // at start, we burn token and jump to level
      if (this.showStartDialog) {
        wallet.burn(
          tx.format.txid,
          output.n,
          output.satoshi,
          (level, amount) => {
            console.log(`go to level ${level} with ${amount} men`);

            // hide start dialog
            this.showProcessingMessage = false;
            this.showStartDialog = false;

            // load level
            window.initClassicInfo();
            window.curLevel = level;
            window.runnerLife = Math.max(amount, 1);
            window.setClassicInfo(0);
            window.stopDemoAndPlay();
          }
        );
      }

      // at game over we send back a resume token
      if (this.showGameOverDialog) {
        wallet.sendBackToken(tx.format.txid, this.gameOverLevel, (err, txid) => {
          if (err) {
            console.log(err);
            return;
          } else {
            // hide game over dialog
            this.showProcessingMessage = false;
            this.showGameOverDialog = false;
            
            // back to start
            this.restartGame();
          }
        });
      }
    });
  },
  methods: {
    playGame() {
      this.showStartDialog = false;
    },
    restartGame() {
      this.showStartDialog = true;
      this.showGameOverDialog = false;
      this.showProcessingMessage = false;
      this.txid = "";
    },
    checkGameOver() {
      let autoPlay = 
           window.playMode == window.PLAY_AUTO
        || window.playMode == window.PLAY_DEMO
        || window.playMode == window.PLAY_DEMO_ONCE;
      
      if (window.runnerLife === 0 && window.gameState == window.GAME_WAITING && !autoPlay) {
        window.clearInterval(this._gameOverInterval);
        this._gameOverInterval = null;
        this.showGameOverDialog = true;
        this.gameOverLevel = window.curLevel;
      }
    },
    requestPayment() {
      badger.requestSend(wallet.bchAddress, (err, txid) => {
        console.log("badger sent txid: " + txid, err);
      });
    },
    requestToken(level, tokenId) {
       badger.requestTokenSend(wallet.bchAddress, tokenId, (err, txid) => {
        console.log("badger sent txid: " + txid, err);
      });
    }
  },
  computed: {
    startDialogClass() {
      return {
        popup: true,
        shown: this.showStartDialog,
        hidden: !this.showStartDialog
      };
    },
    gameOverDialogClass() {
      return {
        popup: true,
        shown: this.showGameOverDialog,
        hidden: !this.showGameOverDialog
      };
    },
    canBadger() {
      return this.ticker > 0 && badger.isUnlocked();
    },
    payButtonTitle() {
      if (badger.isUnlocked()) {
        return "";
      } else if (!badger.hasBadger()) {
        return "Please install the Badger wallet.";
      } else {
        return "You need to unlock Badger wallet.";
      }
    }
  }
};
</script>

<style>
.popup {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1px;
  height: 1px;
}

.popup.hidden {
  display: none;
}

.popup.shown {
  position: absolute;
  z-index: 1;
}

.popup .dialog {
  position: relative;
  left: -300px;
  top: -250px;
  background-color: white;
  width: 600px;
  height: 500px;
  padding: 10px 20px 10px 20px;
}

#gameoverdialog .dialog {
  height: 330px;
}

.popup h2 {
  text-align: center;
}

.popup p .alert {
  color: red;
}

.popup div.levels {
  text-align: center;
}

.popup div.levels a {
  border: 1px solid #444444;
  display: inline-block;
  margin: 1px;
  padding: 2px;
  min-width: 30px;
  text-decoration: none;
  color: blue;
}

.popup div.levels a:visited {
  color: blue;
}

.popup div.levels a:hover {
  background-color: #faa;
  color: white;
}

.popup div.buttons {
  text-align: center;
  margin-top: 20px;
}

.popup div.processing {
  text-align: center;
}

.popup .buttons.badger button {
  width: 200px;
  height: 50px;
  font-size: 14pt;
}
</style>
