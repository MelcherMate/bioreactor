require("dotenv").config();
require("@babel/register")({
  presets: ["@babel/preset-env"],
});

// Import the rest of our application.
module.exports = require("./start.js");
