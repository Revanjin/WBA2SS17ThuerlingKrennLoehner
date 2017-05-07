//fs nimmt variablen aus dokument
//Aufgabe 2 
var fs = require('fs');
var chalk = require('chalk');

    //File implementieren und convertieren von text to js object
    fs.readFile('staedte.json', function(err, data){
        var staedte = JSON.parse(data);
        
        //Inhalte Anzeigen der eingelesenen Datei
        //Aufgabe 2 Chalk hinzugefügt
        for(var i=0; i<staedte.cities.length; i++){
			console.log(chalk.white.bgBlack.bold('Name:       '+staedte.cities[i].name));
			console.log(chalk.gray.bgRed.bold('Country:    '+staedte.cities[i].country));
			console.log(chalk.gray.bgYellow.bold('Population: '+staedte.cities[i].population));
		//	Damit nach jeder Ausgabe der Daten auch abgetrennt wird	
			if(i < staedte.cities.length - 1){
				console.log("--------------------");
          }
    }
});