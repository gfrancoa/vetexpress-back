const { Router } = require("express"),
  router = Router();

router.use("/reserva", require("./reserva.route"));
router.use("/empleado", require("./empleado.route"));

module.exports = router;
