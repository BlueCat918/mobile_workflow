module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          "browsers": ["> 5%", "last 5 versions", "not ie <= 8"]
        }
      }
    ]
  ]
}