const express = require('express');
const router = express.Router();
const { registerVehicle, getVehicles, getVehicleByPlate } = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Todas las rutas protegidas

router.route('/')
    .post(registerVehicle)
    .get(getVehicles);

router.get('/:placa', getVehicleByPlate);

module.exports = router;
