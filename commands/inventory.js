const Discord = require('discord.js');

module.exports = {
	name: 'inventory',
	description: 'Tells people not to ask to ask a question, but to simply ask their question.',
	execute(message) {
        var fs = require('fs');

        var data = {}
        data.table = []
        for (i=0; i <26 ; i++){
           var obj = {
               id: i,
               square: i * i
           }
           data.table.push(obj)
        }
        fs.writeFile ("player.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
	},
};
