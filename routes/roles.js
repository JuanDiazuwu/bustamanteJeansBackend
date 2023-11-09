const express = require('express');
const router = express.Router();
const controller = require('../controllers/roles');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware('roles', 'CREATE'), controller.create);

router.get('/', authMiddleware('roles', 'READ'), controller.list);

router.get('/:id', authMiddleware('roles', 'READ'), controller.index);

router.put('/:id', authMiddleware('roles', 'UPDATE'), controller.replace);

router.patch('/:id', authMiddleware('roles', 'UPDATE'), controller.update);

router.delete('/:id', authMiddleware('roles', 'DELETE'), controller.destroy);

module.exports = router;
3