const body_parser = require("body-parser");
const imageParser = body_parser.raw({ type: "image/*", limit: "10mb" });
module.exports = imageParser;
