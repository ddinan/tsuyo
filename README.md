<p align="center">
    <a href="http://tsuyo.xyz"><img width='100%' src="https://i.imgur.com/sCNV086.png.png"></a>
    <br>
    <a href="https://standardjs.com/"><img width='108px' src="https://i.imgur.com/7nT5ptA.png"></a>
    <img src="https://img.shields.io/discord/492875641713328143?color=%237086D2&label=Discord&logo=Discord&style=for-the-badge">
    <img src="https://img.shields.io/github/license/TsuyoBot/main?logo=Apache&style=for-the-badge">
    <img src="https://img.shields.io/github/repo-size/TsuyoBot/main.svg?style=for-the-badge">
</p>

## A light-weight, multi-purpose Discord bot built with Discord.js.

### Features
- Currency/points system
- XP levelling
- Per-guild settings
- Fun games and commands
- Moderation and logging
- Helpful community and quality support

### Installation:
A couple of dependencies you will need:
[NodeJS](https://nodejs.org/en/download/) - A JavaScript runtime, it also has NPM built-in.

Once NodeJS is installed, install the npm dependencies in the windows command prompt.
- ```cd [folder where the package.json is]```
- ```npm install```

Now that the hard part is over, installation is a simple as a couple of clicks *(and patience depending on your internet speed)*. Simply fork or download the repository and then execute this in the windows command prompt.
- ```cd [folder where bot.js is]```
- ```node bot```

### Setting up the bot:
By default, the only thing you will need to edit in **_.env_** is the bot's token. If you're not sure on how to get a bot token, you can follow [this tutorial](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) made by our friends over at [Reactiflux](https://www.reactiflux.com/).

    TOKEN=SEE-ABOVE-IF-NOT-SURE

Optionally, you can edit the other stuff too if you want to add DBL voting and server count and dashboard.

### Setting up the dashboard with MongoDB
Setting up the dashboard is disabled by default, only follow these steps if you plan on hosting the dashboard.

1. Create a **free** account with [MongoDB](https://www.mongodb.com/).
2. Create a **new cluster** using either **premium** or **free** plans.
3. After the cluster has been created, click **connect**.

![](https://i.imgur.com/0nLS6Di.png)

4. Set up credentials and then click on **Choose a connection method**. Remember your `<dbUser>` and `<dbUserPassword>` values, we will be using them later. 

![](https://i.imgur.com/nAEi8NV.png)

5. Select **Connect with the MongoDB shell**.

![](https://i.imgur.com/P159czd.png)

6. Grab your `<dbName>` and `<identifier>` values from here, we will be using them shortly.

![](https://i.imgur.com/XTeYUxQ.png)

7. After MongoDB has been set up, navigate to your `.env` file located where the bot folder is and add the following line into it. Replace `<dbUser>`, `<dbUserPassword>`, `<dbName>` and `<identifier>` with the values you have set up with MongoDB.
`MONGODB_HOST=mongodb+srv://<dbUser>:<dbUserPassword>@<dbName>.<identifier>.mongodb.net/database?retryWrites=true&w=majority`
8. Run the bot and the dashboard should be running.


### Contributing guidelines:
You can find information on editing files, pull requests, merge requests and issues [here](https://github.com/TsuyoBot/main/wiki/Contributing-Guidelines).

### Don't want to host the bot yourself?
We have a public instance of the bot which you can add to your Discord [here](https://discordapp.com/oauth2/authorize?client_id=492871769485475840&scope=bot&permissions=1506142455).

### Having problems?
Why not join the [official Tsuyo Bot Support Discord](https://discord.gg/3hbeQgY)? With lots of things to do and loads of members to chat with, it's one of the most friendly places on the internet... sorta.
