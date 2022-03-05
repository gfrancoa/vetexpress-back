const express = require("express"),
  router = express.Router(),
  reservaCtrl = require("../controllers/reservas.controller"),
  checkAuth = require("../middleware/verificarToken");

router.post("/", reservaCtrl.createReserva);
router.put("/", reservaCtrl.editReservaStatus);
router.get("/:uuid",reservaCtrl.getReservaByUuid);
router.get("/", checkAuth.verificarToken,reservaCtrl.getReservas);

module.exports = router;
