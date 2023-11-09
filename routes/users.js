const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware('users', 'CREATE'), controller.create);

router.get('/', authMiddleware('users', 'READ'), controller.list);

router.get('/:id', authMiddleware('users', 'READ'), controller.index);

router.put('/:id', authMiddleware('users', 'UPDATE'), controller.replace);

router.patch('/:id', authMiddleware('users', 'UPDATE'), controller.update);

router.delete('/:id', authMiddleware('users', 'DELETE'), controller.destroy);

module.exports = router;