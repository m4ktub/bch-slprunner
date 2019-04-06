module.exports = {
  publicPath: "/",
  configureWebpack: {
    output: {
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    }
  }
};
