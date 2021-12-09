const {Router} = require('express') ;
const {
    getNews,
    getNewById,
    deleteNew,
    createNew,
    updateNew
} = require('../controllers/news-controller') ;

//inicilizacion
const router = Router();

//rutas
router.get('/',
                getNews);

router.get('/:id',
                getNewById);

router.post('/nuevo',
                 createNew);

router.delete('/eliminar/:id',
                deleteNew);

router.put('/actualizar/:id',
                updateNew);

module.exports = router;