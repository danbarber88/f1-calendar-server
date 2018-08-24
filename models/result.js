const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  round: Number,
  fastestLapTime: String,
  fastestLapDriver: String,
  fastestLapDriverNum: String,
  first: String,
  second: String,
  third: String
});

module.exports = mongoose.model("Result", resultSchema);
