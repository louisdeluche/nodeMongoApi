const express = require('express');
const router = express.Router();
const articleController = require('../app/api/controllers/articles');
router.get('/', articleController.getAll);
router.post('/create', articleController.create);
router.get('/:articleId', articleController.getById);
router.put('/:articleId', articleController.updateById);
router.delete('/:articleId', articleController.deleteById);
module.exports = router;