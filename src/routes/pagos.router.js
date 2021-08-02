import {Router} from 'express';
import {
    getPagos,
    getPagoById,
    nuevoPago,
    deletePago,
    updatePago
} from '../controllers/pagosController'

//inicilizacion
const router = Router();

//rutas
router.get('/',getPagos);
router.get('/:id',getPagoById);
router.post('/nuevo',nuevoPago); //generar trigger -> actualizar total -> stock
router.delete('/eliminar/:id',deletePago); //generar trigger -> borrar previamente los detalle_Pago
router.put('/actualizar/:id',updatePago); //definir que se puede actualizar de la compra

export default router;