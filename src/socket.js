import io from "socket.io-client";

const Configuration = {
  baseURL: 'https://rest.bitcoin.com'
}

export default class Socket {
  
  constructor() {
    this._socket = io(Configuration.baseURL);
    this._socket.on("disconnect", reason => this.disconnected(reason));
  }

  onTransaction(callback) {
    this._socket.on("transactions", transaction => {
      callback(JSON.parse(transaction));
    });
  }

  onBlock(callback) {
    this._socket.on("blocks", block => {
      callback(JSON.parse(block));
    });
  }

  disconnected(reason) {
    if (reason === "io server disconnect") {
      this._socket.connect();
    }
  }

}
