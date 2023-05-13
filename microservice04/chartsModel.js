const mongoose = require("mongoose");

const chartsSchema = mongoose.Schema({
  user_email: String,
  type: String,
  date: Date,
  svg_string: String
});


module.exports.Charts = mongoose.model('Charts', chartsSchema);