var fs = require('fs');
var chalk = require('chalk');

	// 	Read the File staedte.json , convert text to js obj
	fs.readFile('staedte.json', function(err, data){
		var staedte = JSON.parse(data);
		
		
		// Fuer Aufgabe 3 - .sort 
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?v=example
		staedte.cities.sort(function(a, b){
			return a.population - b.population;			
		}); 
		
		//http://www.daveeddy.com/2013/03/26/synchronous-file-io-in-nodejs/
		fs.writeFileSync( 'staedte_sortiert.json', JSON.stringify(staedte, null, 4));
			console.log("--------------------------------");
			console.log("staedte_sortiert.json erfolgreich erstellt");
			console.log("--------------------------------");

		
		// 	ForSchleife zum ausgeben der bereits gelesenen daten
		//	Fuer Aufgabe2 - Chalk Module hinzugefuegt
		for(var i=0; i<staedte.cities.length; i++){
			console.log(chalk.white.bgRed.bold('Name:       '+staedte.cities[i].name));
			console.log(chalk.gray.bgCyan.bold('Country:    '+staedte.cities[i].country));
			console.log(chalk.gray.bgWhite.bold('Population: '+staedte.cities[i].population));
		//	Damit nach jeder Ausgabe der Daten auch abgetrennt wird	
			if(i < staedte.cities.length - 1){
				console.log("--------------------");
			}
		}
	});
	