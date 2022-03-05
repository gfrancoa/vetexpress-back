const Reserva = require('../models/Reserva')
const { v4: uuidv4 } = require('uuid');

const createReserva = async (req, res) => {

  const newReserva = new Reserva({
    nombre_solicitante: req.body.nombre_solicitante,
    uuid: uuidv4(),
    id_solicitante: req.body.id_solicitante,
    fecha_cita: req.body.fecha_cita,
    descripcion: req.body.descripcion,
    comentario:{fecha:Date.now()}
  });

  const reservas = await Reserva.find({fecha_cita:req.body.fecha_cita})

  if(reservas.length>0){
      res.json({
          message:"Ya existe una reserva con esta fecha",
          status:409
      })
  } else {
       await newReserva.save();

       res.json({
         message: "Registro creado exitosamente",
         status: 201,
         uuid: newReserva.uuid,
       });
  }

 
};

const editReservaStatus = async (req, res) => {
    const {
        uuid,
        status,
        observacion,
        fecha
    } = req.body;

    await Reserva.findOneAndUpdate({uuid:uuid},{
        status:status,
        $push:{comentario:{observacion:observacion,status:status,fecha:fecha}}
    })

  res.json({
    message: "Status actualizado exitosamente",
    status: 200,
  });
};

const getReservaByUuid = async (req,res) => {
    const uuid = req.params.uuid

    const reserva = await Reserva.findOne({ uuid: uuid });

    res.json(reserva)
}

const getReservas = async (req, res) => {
  

  const reserva = await Reserva.find();

  res.json(reserva);
};

module.exports={
    editReservaStatus,
    createReserva,
    getReservaByUuid,
    getReservas
}