var db;
const utils = require('../public/js/utils.js');
const db_turmaprof = require('./turmaprof.js');

var self = module.exports = {

	inicia : function(database){
		db = database;
	},

	insere : function(turma){
		var sqlstr;
		
		sqlstr = 'INSERT INTO turma (nome, id_materia, restricao) VALUES ("' + turma.nome + '", ' + turma.id_materia + ', "' + turma.restricao + '") ;';
		db.run(sqlstr);
	},

	update : function(turma){
		var sqlstr;

		sqlstr = db.prepare('UPDATE turma SET nome = "'+ turma.nome + '", id_materia = '+ turma.id_materia+ ', restricao = "'+ turma.restricao + '" WHERE id=:aval');
		sqlstr.getAsObject({':aval' : turma.id});
	},

	delete : function(condicao, id){
		var sqlstr;

		sqlstr = db.prepare('DELETE FROM turma WHERE '+ condicao + '=:aval');
		sqlstr.getAsObject({':aval' : id});

		db.run(sqlstr);

		db_turmaprof.delete('id_turma', id);
	},

	buscaNomeTurmas : function(id_materia){
		var t = db.exec('SELECT id, nome FROM turma WHERE id_materia =' + id_materia + ' ORDER BY nome ASC');
		var val = [];

		t.forEach(function(item){
			val.push(item.values);
		});

		return (!utils.isEmpty(val[0]) ? val[0] : 0);
	},

	selectTurmas : function(){
		var t = db.exec('SELECT t.id, t.nome AS "turma_nome", m.nome AS "materia_nome", t.restricao, m.id FROM turma AS t LEFT JOIN materia AS m ON t.id_materia = m.id ORDER BY materia_nome, turma_nome ASC');
		var val = [];

		t.forEach(function(item){
			val.push(item.values);
		});

		return (!utils.isEmpty(val[0]) ? val[0] : 0);
	}
};