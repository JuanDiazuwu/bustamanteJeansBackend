const express = require('express');
const router = express.Router();
const controller = require('../controllers/catalogs');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware('catalogs', 'CREATE'), controller.create);

router.get('/', authMiddleware('catalogs', 'READ'), controller.list);

router.get('/:id', authMiddleware('catalogs', 'READ'), controller.index);

router.put('/:id', authMiddleware('catalogs', 'UPDATE'), controller.replace);

router.patch('/:id', authMiddleware('catalogs', 'UPDATE'), controller.update);

router.delete('/:id', authMiddleware('catalogs', 'DELETE'), controller.destroy);

module.exports = router;