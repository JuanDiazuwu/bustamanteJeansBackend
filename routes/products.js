const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware('products', 'CREATE'), controller.create);

router.get('/', authMiddleware('products', 'READ'), controller.list);

router.get('/:id', authMiddleware('products', 'READ'), controller.index);

router.put('/:id', authMiddleware('products', 'UPDATE'), controller.replace);

router.patch('/:id', authMiddleware('products', 'UPDATE'), controller.update);

router.delete('/:id', authMiddleware('products', 'DELETE'), controller.destroy);

module.exports = router;