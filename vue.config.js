module.exports = {
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html"
    }
  },
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true
};
