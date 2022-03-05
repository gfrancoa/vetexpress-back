const bcrypt = require("bcrypt");
const Empleado = require("../models/Empleado");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  Empleado.findOne({ id: req.body.id }).then((empleado) => {
    //Si el usuario no existe
    if (!empleado) {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const newEmpleado = new Empleado({
          id: req.body.id,
          name: req.body.name,
          telefono: req.body.telefono,
          password: hash,
        });

        newEmpleado
          .save()
          .then((result) => {
            console.log(result);
            res
              .status(201)
              .json({ message: "Usuario creado", userId: result._id });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      });
    } else {
      res.status(201).json({ message: "Usuario existente", userId: user._id });
    }
  });
};

exports.login = (req, res) => {
  let empleadoGet;
  Empleado.findOne({ id: req.body.id })
    .then((user) => {
      // user !== null  --> null != null => !False => not False => True
      if (!user) {
        return res.status(401).json({ message: "Autenticación fallida" });
      }
      empleadoGet = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ message: "Autenticación fallida" });
      }

      //res.status(200).json({ message: "Autenticación exitosa" });

      const token = jwt.sign(
        { id: empleadoGet.id, userId: empleadoGet._id },
        "N0d3H0u53!*20*22",
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ token: token, expiresIn: 3600, userId: empleadoGet._id });
    })
    .catch((err) => {
      return res.status(401).json({ message: "Autenticación fallida " + err });
    });
};
