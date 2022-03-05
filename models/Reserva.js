const mongoose = require("mongoose");

let reservaSchema = new mongoose.Schema({
  nombre_solicitante: { type: String },
  uuid: { type: String, unique:true },
  id_solicitante: { type: String },
  fecha_cita: { type: String },
  descripcion: { type: String },
  status: {
    type: String,
    enum: ["reservado", "cancelado", "activo", "completado"],
    default: "reservado",
  },
  comentario: [
    {
      observacion: { type: String,default:"exitoso" },
      status: { type: String,default:"reservado" },
      fecha: { type: Date,default: Date.now() },
    },
   
  ],
});

module.exports = mongoose.model("reserva", reservaSchema);
