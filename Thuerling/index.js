var fs = require('fs');

	// 	Read the File staedte.json , convert text to js obj
	fs.readFile('staedte.json', function(err, data){
		var staedte = JSON.parse(data);
	
	// 	ForSchleife zum ausgeben der bereits gelesenen daten
	for(var i=0; i<staedte.cities.length; i++){
		console.log('Name:       '+staedte.cities[i].name);
		console.log('Country:    '+staedte.cities[i].country);
		console.log('Population: '+staedte.cities[i].population);
	//	Damit nach jeder Ausgabe der Daten auch abgetrennt wird	
		if(i < staedte.cities.length - 1){
			console.log("--------------------");
		}
	}
	});