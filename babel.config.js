module.exports = api => ({
  presets: [
    [
      "@babel/preset-env",
      api.env("test")
        ? {
            targets: {
              node: "current"
            }
          }
        : { targets: ">0.25%, not dead", modules: "false" }
    ],
    "@babel/preset-typescript"
  ]
});
