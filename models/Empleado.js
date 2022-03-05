const mongoose = require("mongoose");

let empleadoSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  telefono: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("empleado", empleadoSchema);
