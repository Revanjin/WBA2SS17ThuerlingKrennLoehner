var fs = require('fs');
var chalk = require('chalk');

fs.readFile('staedte.json', function(err, data)
	{
		var staedte = JSON.parse(data);
			staedte.cities.sort(function(a, b)
				{
					return a.population - b.population;			
				}); 
			fs.writeFileSync( 'staedte_sortiert.json', JSON.stringify(staedte, null, 4));
		

			for(var i=0; i<staedte.cities.length; i++)
				{
					console.log(chalk.red('Name:       '+staedte.cities[i].name));
					console.log(chalk.white('Country:    '+staedte.cities[i].country));
					console.log(chalk.cyan('Population: '+staedte.cities[i].population));
				if(i < staedte.cities.length - 1)
					{
						console.log("--------------------");
					}
				}

	});