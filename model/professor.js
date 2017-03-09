var db;

var self = module.exports = {

	inicia : function(database){
		db = database;
	},

	insere : function(professor){
		var sqlstr, profID;
		
		sqlstr = 'INSERT INTO professor (nome) VALUES ("' + professor.nome + '") ;';
		db.run(sqlstr);
	},

	update : function(professor){
		var sqlstr;

		sqlstr = db.prepare('UPDATE professor SET nome = "'+ professor.nome + '" WHERE id=:aval');
		sqlstr.getAsObject({':aval' : professor.id});
	},

	delete : function(condicao, id){
		var sqlstr;

		sqlstr = db.prepare('DELETE FROM professor WHERE '+ condicao + '=:aval');
		sqlstr.getAsObject({':aval' : id});

		db.run(sqlstr);
	}
};