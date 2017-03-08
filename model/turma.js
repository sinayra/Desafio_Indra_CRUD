var db;

var self = module.exports = {

	inicia : function(database){
		db = database;
	},

	insere : function(turma){
		var sqlstr;
		
		sqlstr = 'INSERT INTO turma (nome, id_materia) VALUES ("' + turma.nome + '", ' + turma.id_materia + ') ;';
		db.run(sqlstr);
	},

	update : function(turma){
		var sqlstr;


		sqlstr = db.prepare('UPDATE turma SET nome = "'+ turma.nome + '", id_materia = "'+ turma.id_materia+ '" WHERE id=:aval');
		sqlstr.getAsObject({':aval' : turma.id});
	},

	delete : function(condicao, id){
		var sqlstr;

		sqlstr = db.prepare('DELETE FROM turma WHERE '+ condicao + '=:aval');
		sqlstr.getAsObject({':aval' : id});

		db.run(sqlstr);
	}
};