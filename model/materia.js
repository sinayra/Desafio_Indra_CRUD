var db;

var self = module.exports = {

	inicia : function(database){
		db = database;
	},

	insere : function(materia){
		var sqlstr;
		
		sqlstr = 'INSERT INTO materia (nome) VALUES ("' + materia.nome + '") ;';
		db.run(sqlstr);
	},

	update : function(materia){
		var sqlstr;

		sqlstr = db.prepare('UPDATE materia SET nome = "'+ materia.nome + '" WHERE id=:aval');
		sqlstr.getAsObject({':aval' : materia.id});
	},

	delete : function(condicao, id){
		var sqlstr;

		sqlstr = db.prepare('DELETE FROM materia WHERE '+ condicao + '=:aval');
		sqlstr.getAsObject({':aval' : id});

		db.run(sqlstr);
	}
};