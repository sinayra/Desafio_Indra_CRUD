var db;
const utils = require('../public/js/utils.js');

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
	},

	buscaMateriaInfo : function(id){
		var t = db.exec(
			"SELECT 	t.nome AS 'nome_turma'," +
			"			t.restricao, " +
			"			CASE WHEN GROUP_CONCAT(p.nome) IS NULL THEN 'A designar' ELSE GROUP_CONCAT(p.nome) END AS 'nome_professores' " +
			"FROM	turma AS t " + 
			"LEFT JOIN turmaprof AS tp " +
			"ON		t.id = tp.id_turma " +
			"LEFT JOIN professor AS p " +
			"ON		tp.id_professor = p.id " +
			"WHERE 	t.id_materia = " + id + " " +
			"GROUP BY t.id "
		);
		var val = [];

		t.forEach(function(item){
			val.push(item.values);
		});

		console.log(val[0]);

		return (!utils.isEmpty(val[0]) ? val[0] : 0);
	}
};