const express = require('express');
const router = express.Router();
const { registrarIngreso, registrarSalida, getHistorial, getActivos } = require('../controllers/parkingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/ingreso', registrarIngreso);
router.post('/salida', registrarSalida);
router.get('/historial', getHistorial);
router.get('/activos', getActivos);

module.exports = router;
