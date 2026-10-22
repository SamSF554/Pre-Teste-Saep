const Produto = require('../models/Produto');
const { Op } = require('sequelize');
async function cadastrar(req, res) {
  try {
    const { nome, descricao, quantidade_estoque } = req.body;
    const produto = await Produto.create({ nome, descricao, quantidade_estoque });
    res.status(201).json(produto);
  } catch (erro) { res.status(400).json({ mensagem: 'Erro ao cadastrar', erro: erro.message }); }
}
async function listar(req, res) {
  try {
    const { pagina = 1, limite = 10, nome, data } = req.query;
    const filtro = {};
    if (nome) filtro.nome = { [Op.like]: `%${nome}%` };
    if (data) filtro.createdAt = { [Op.gte]: new Date(data) };
    const produtos = await Produto.findAll({
      where: filtro, limit: Number(limite), offset: (Number(pagina) - 1) * Number(limite)
    });
    res.json(produtos);
  } catch (erro) { res.status(400).json({ mensagem: 'Erro ao listar', erro: erro.message }); }
}
async function deletar(req, res) {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    await produto.destroy();
    res.status(200).json({ mensagem: 'Produto removido com sucesso' });
  } catch (erro) { res.status(400).json({ mensagem: 'Erro ao remover', erro: erro.message }); }
}
module.exports = { cadastrar, listar, deletar };