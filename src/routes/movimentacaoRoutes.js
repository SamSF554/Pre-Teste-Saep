const express = require('express');
const router = express.Router();
const movimentacaoController = require('../controllers/movimentacaoController');
const auth = require('../middlewares/auth');
router.post('/movimentacoes', auth, movimentacaoController.cadastrar);
router.get('/movimentacoes', auth, movimentacaoController.listar);
module.exports = router;