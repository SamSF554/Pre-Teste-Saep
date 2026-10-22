const Movimentacao = require('../models/Movimentacao');
const Produto = require('../models/Produto');
async function cadastrar(req, res) {
  try {
    const { produto_id, tipo, quantidade } = req.body;
    const produto = await Produto.findByPk(produto_id);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    
    if (tipo === 'saida' && produto.quantidade_estoque < quantidade) {
      return res.status(400).json({
        mensagem: `Saída não permitida: estoque insuficiente. Disponível: ${produto.quantidade_estoque}. Solicitado: ${quantidade}.`
      });
    }
    
    const novaQuantidade = tipo === 'entrada' ? produto.quantidade_estoque + quantidade : produto.quantidade_estoque - quantidade;
    await produto.update({ quantidade_estoque: novaQuantidade });
    
    const movimentacao = await Movimentacao.create({
      produto_id, tipo, quantidade, usuario_id: req.usuario.id
    });
    res.status(201).json(movimentacao);
  } catch (erro) { res.status(400).json({ mensagem: 'Erro ao cadastrar movimentação', erro: erro.message }); }
}
async function listar(req, res) {
  try {
    const movimentacoes = await Movimentacao.findAll({ order: [['createdAt', 'DESC']] });
    res.json(movimentacoes);
  } catch (erro) { res.status(400).json({ mensagem: 'Erro ao listar', erro: erro.message }); }
}
module.exports = { cadastrar, listar };