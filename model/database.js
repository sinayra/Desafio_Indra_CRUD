const path = require('path');
const fs = require('fs');
const SQL = require('sql.js');
const utils = require('../public/js/utils.js');
const PORT = 8080;
var db;
const dbstring = path.join(__dirname, '../SQLite/banco.db');

var self = module.exports = {

	materia : require('./materia.js'),
	turma : require('./turma.js'),
/*	professor : require('./professor.js'),
*/
	iniciaBD : function(){

		try{
			var filebuffer = fs.readFileSync(dbstring);
		}
		catch (e) {
			filebuffer = null;
			console.log(e);
		}


		if (filebuffer != null) {
			db = new SQL.Database(filebuffer);
		} 
		else {
			db = null;
			console.log("Erro ao conectar com o banco");
		}

		self.materia.inicia(db);
		self.turma.inicia(db);
	/*	self.professor.inicia(db);
	*/
	},

	getPort : function(){
		return PORT;
	},

	gravaBD : function(){
		var data = db.export();
		var buffer = new Buffer(data);	
		fs.writeFileSync(dbstring, buffer);
	},

	selectTudo : function (table, order){
		var t = db.exec('SELECT * FROM ' + table + ' ORDER BY ' + order + ' DESC');
		var val = [];

		t.forEach(function(item){
			val.push(item.values);
		});

		return val[0];
	},

	encerraBD : function(){
		self.gravaBD();

		db.close();
	}
};