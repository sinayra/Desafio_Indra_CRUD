var db;

var self = module.exports = {

	inicia : function(database){
		db = database;
	},

	insere : function(turmaprof){
		var sqlstr;
		
		sqlstr = 'INSERT INTO turmaprof (id_professor, id_turma) VALUES (' + turmaprof.id_professor + ', ' + turmaprof.id_turma + ') ;';

		db.run(sqlstr);
	},

	update : function(turmaprof){
		var sqlstr;

		sqlstr = db.prepare('UPDATE turmaprof SET id_professor = '+ turmaprof.id_professor + ', id_turma = ' + turmaprof.id_turma + ' WHERE id=:aval');
		sqlstr.getAsObject({':aval' : turmaprof.id});
	},

	delete : function(condicao, id){
		var sqlstr;

		sqlstr = db.prepare('DELETE FROM turmaprof WHERE '+ condicao + '=:aval');
		sqlstr.getAsObject({':aval' : id});

		db.run(sqlstr);
	}
};