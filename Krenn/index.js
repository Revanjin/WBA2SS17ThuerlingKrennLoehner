var fs = require('fs');
var chalk = require('chalk');

fs.readFile('staedte.json', function(err, data){
		var staedte = JSON.parse(data);
		

for(var i=0; i<staedte.cities.length; i++){
			console.log(chalk.red('Name:       '+staedte.cities[i].name));
			console.log(chalk.white('Country:    '+staedte.cities[i].country));
			console.log(chalk.cyan('Population: '+staedte.cities[i].population));
		//	Damit nach jeder Ausgabe der Daten auch abgetrennt wird	
			if(i < staedte.cities.length - 1){
				console.log("--------------------");
			}
		}

		});