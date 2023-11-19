const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventories');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware('inventories', 'CREATE'), controller.create);

router.get('/', authMiddleware('inventories', 'READ'), controller.list);

router.get('/:id', authMiddleware('inventories', 'READ'), controller.index);

router.put('/:id', authMiddleware('inventories', 'UPDATE'), controller.replace);

router.patch('/:id', authMiddleware('inventories', 'UPDATE'), controller.update);

router.delete('/:id', authMiddleware('inventories', 'DELETE'), controller.destroy);

module.exports = router;