const express = require('express');
const router = express.Router();
const controller = require('../controllers/layaways');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware('layaways', 'CREATE'), controller.create);

router.get('/', authMiddleware('layaways', 'READ'), controller.list);

router.get('/:id', authMiddleware('layaways', 'READ'), controller.index);

router.put('/:id', authMiddleware('layaways', 'UPDATE'), controller.replace);

router.patch('/:id', authMiddleware('layaways', 'UPDATE'), controller.update);

router.delete('/:id', authMiddleware('layaways', 'DELETE'), controller.destroy);

module.exports = router;