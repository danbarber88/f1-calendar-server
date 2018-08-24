const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lastFetchSchema = new Schema({
  lastFetch: String
});

module.exports = mongoose.model("LastFetch", lastFetchSchema);
