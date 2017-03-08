const express = require('express');
const view = express();
var bodyParser = require('body-parser');
const utils = require('../public/js/utils.js');


var self = module.exports = {

	iniciaRotas : function(db){
		
		view.set("view engine", "ejs");
		view.use(express.static('public'));

		view.listen(db.getPort());

		view.use(bodyParser.json()); 
		view.use(bodyParser.urlencoded({ extended: true }));

		self.geral(db);
		self.materia(db);
		self.turma(db);
/*		self.professor(db);
*/
	},

	geral : function(db){
		view.get('/', function (req, res) {
			res.render("pages/index");
		});


		view.get('/menu/cadastro', function (req, res) {
			var parametros = {
				professor : db.selectTudo("professor", "nome"),
				turma : db.selectTudo("turma", "nome"),
				materia: db.selectTudo("materia", "nome")
			};

			res.render("pages/menu/cadastro", parametros);
		});
	},

	materia : function(db){
		view.post('/menu/cadastro/materia', function (req, res) {

			db.materia.insere(req.body.params);
			res.sendStatus(200);
		});
	},

	turma : function(db){
		view.post('/menu/cadastro/turma', function (req, res) {

			db.turma.insere(req.body.params);
			res.sendStatus(200);
		});
	}

/*	veiculo : function(db){
		view.post('/menu/busca/veiculo_edit', function (req, res) {
			var parametros = { 
					veiculo: db.veiculo.selectVeiculoInfo(req.body.id),
					pessoas: db.selectTudo('pessoa', 'nome'),
					tipo: req.body.tipo
				};

			res.render("pages/menu/busca/veiculo_edit", parametros);
		});

		view.post('/menu/cadastro/veiculo', function (req, res, prox) {
				if(db.veiculo.existeVeiculo(req.body.veiculo.placa, req.body.veiculo.tipo) && req.body.force == 'false'){
					res.sendStatus(406);
				}
				else{
					prox();
				}
			}, 
			function(req, res){

				db.veiculo.insere(req.body.veiculo);
				res.sendStatus(200);

			}
		);

		view.post('/menu/update/veiculo', function (req, res) {
			db.veiculo.update(req.body.veiculo);
			res.sendStatus(200);
		});

		view.post('/menu/delete/veiculo', function (req, res) {
			db.veiculo.delete('id', req.body.veiculo.id);
			res.sendStatus(200);
		});
	},

	telefone : function(db){
		view.post('/menu/cadastro/pessoa_tel', function (req, res) {
			db.telefone.insere(req.body.telefone)
			res.sendStatus(200);
		});

		view.post('/menu/update/pessoa_tel', function (req, res) {
			db.telefone.update(req.body.telefone)
			res.sendStatus(200);
	
		});

		view.post('/menu/delete/pessoa_tel', function (req, res) {
			db.telefone.delete('id', req.body.telefone.id);
			res.sendStatus(200);
		});
	},

	emprestimo : function(db){
		view.post('/menu/cadastro/emprestimo', function (req, res) {
			db.emprestimo.insere(req.body.emprestimo, req.body.divida)
			res.sendStatus(200);
		});

		view.post('/menu/update/emprestimo', function (req, res) {
			db.emprestimo.update(req.body.emprestimo)
			res.sendStatus(200);
		});

		view.post('/menu/renova/emprestimo', function (req, res) {
			db.emprestimo.renova(req.body.emprestimo)
			res.sendStatus(200);
		});

		view.post('/menu/delete/emprestimo', function (req, res) {
			db.emprestimo.delete('id', req.body.emprestimo.id);
			res.sendStatus(200);
		});
	},

	conta : function(db){
		view.post('/menu/cadastro/conta', function (req, res) {
			db.conta.insere(req.body.conta)
			res.sendStatus(200);
	
		});

		view.post('/menu/update/conta', function (req, res) {
			db.conta.update(req.body.conta);
			res.sendStatus(200);
	
		});

		view.post('/menu/delete/conta', function (req, res) {
			db.conta.delete('id', req.body.conta.id);
			res.sendStatus(200);
		});
	},

	divida : function(db){
		view.post('/menu/cadastro/divida', function (req, res) {

			db.divida.insere(req.body.divida)
			res.sendStatus(200);
	
		});

		view.post('/menu/update/divida', function (req, res) {
			db.divida.update(req.body.divida);
			res.sendStatus(200);
	
		});

		view.post('/menu/delete/divida', function (req, res) {
			db.divida.delete('id', req.body.divida.id);
			res.sendStatus(200);
		});
	},

	grupo : function(db){
		view.post('/menu/cadastro/grupo', function (req, res) {
			db.grupo.insere(req.body.grupo)
			res.sendStatus(200);
	
		});

		view.post('/menu/update/grupo', function (req, res) {
			db.grupo.update(req.body.grupo);
			res.sendStatus(200);
	
		});

		view.post('/menu/delete/grupo', function (req, res) {
			db.grupo.delete('id', req.body.grupo.id);
			res.sendStatus(200);
		});
	},

	pessoa : function(db){
		view.post('/menu/busca/pessoa_edit', function (req, res) {
			var parametros = {};
			var info = db.pessoa.selectPessoaInfo(req.body.id);

			parametros = { 
					pessoa: info,
					pessoa_tel: {"id" : info.telefones_id.split(","), "numero" : info.telefones.split(",")},
					grupos:  db.selectTudo('grupo', 'nome')
				};

			res.render("pages/menu/busca/pessoa_edit", parametros);
		});

		view.post('/menu/update/pessoa', function (req, res) {
			db.pessoa.update(req.body.pessoa);
			res.sendStatus(200);
		});

		view.post('/menu/delete/pessoa', function (req, res) {
			db.pessoa.delete('id', req.body.pessoa.id);
			res.sendStatus(200);
		});

		view.post('/menu/cadastro/pessoa', function (req, res, prox) {
				if(db.pessoa.existePessoa(req.body.pessoa.nome) && req.body.force == 'false'){
					res.sendStatus(406);
				}
				else{
					prox();
				}
			}, 
			function(req, res){

				db.pessoa.insere(req.body.pessoa, req.body.grupo);
				res.sendStatus(200);

			}
		);	
	}
	*/
};