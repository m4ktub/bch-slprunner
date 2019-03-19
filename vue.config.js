module.exports = {
  publicPath: "/bch-slprunner",
  configureWebpack: {
    output: {
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    }
  }
};
