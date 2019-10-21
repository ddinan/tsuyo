const request = require('request');

module.exports = async client => {
  const statusList = [
    {msg: `the haters hate`, type: 'WATCHING'},
	{msg: `you (turn around)`, type: 'WATCHING'},
    {msg: `outside (JK who does that?)`, type: 'PLAYING'},
	{msg: `alone :'(`, type: 'PLAYING'},
    {msg: `with your heart </3`, type: 'PLAYING'},
    {msg: `with over ${client.users.size} users`, type: 'PLAYING'},
    {msg: `grass grow`, type: 'WATCHING'},
    {msg: `over ${client.guilds.size} servers`, type: 'WATCHING'},
	{msg: `who even reads these anyways?`, type: 'PLAYING'},
    {msg: `funny cat videos`, type: 'WATCHING'}
  ];

  setInterval(async () => {
    let index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 60000);
  
 /*setInterval(async () => {
    request('https://web.tsuyobot.ga', (err, res, html) => {
      if (err) client.logger.error(err);
    });
}, 28000);*/

  client.user.setStatus('online');
  console.log('Finished setting up the bot.');

  //Starts the web server/API
  //require('../modules/web')(client);
};