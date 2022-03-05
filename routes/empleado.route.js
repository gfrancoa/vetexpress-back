const express = require("express"),
  router = express.Router(),
  empleadoCtrl = require("../controllers/empleado.controller");

router.post("/login", empleadoCtrl.login);
router.post("/signup", empleadoCtrl.signup);

module.exports = router;
