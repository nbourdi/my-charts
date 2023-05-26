const mongoose = require("mongoose");

const chartsSchema = mongoose.Schema({
  user_email: String,
  date: Date,
  type: String,
  chart_title: String,
  svg_string: String
});

const Charts = mongoose.model('Charts', chartsSchema);

module.exports = { Charts };