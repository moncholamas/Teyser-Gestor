const {Router} = require('express') ;
const {
createEquipment,
deleteEquipment,
getEquipmentById,
getEquipments,
updateEquipment
} = require('../controllers/equipments-controllers') ;

//inicilizacion
const router = Router();

//rutas
router.get('/',
                getEquipments);

router.get('/:id',
                getEquipmentById);

router.post('/nuevo',
                createEquipment);

router.delete('/eliminar/:id',
                deleteEquipment);

router.put('/actualizar/:id',
                 updateEquipment);


module.exports = router;