var db;
const utils = require('../public/js/utils.js');

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

		console.log(turmaprof);

		sqlstr = db.prepare('UPDATE turmaprof SET id_professor = '+ turmaprof.id_professor + ', id_turma = ' + turmaprof.id_turma + ' WHERE id=:aval');
		sqlstr.getAsObject({':aval' : turmaprof.id});
	},

	delete : function(condicao, id){
		var sqlstr;

		sqlstr = db.prepare('DELETE FROM turmaprof WHERE '+ condicao + '=:aval');
		sqlstr.getAsObject({':aval' : id});

		db.run(sqlstr);
	},

	selectTurmasProf : function(){
		var t = db.exec(
			"SELECT 	tp.id, " +
			"			tp.id_professor, " +
			"			tp.id_turma, " +
			"			t.id_materia " +
			"FROM	turmaprof AS tp " +
			"LEFT JOIN turma AS t " +
			"ON 	tp.id_turma = t.id " +
			"ORDER BY t.id_materia"
		);
		var val = [];


		t.forEach(function(item){
			val.push(item.values);
		});

		return (!utils.isEmpty(val[0]) ? val[0] : 0);
	}
};