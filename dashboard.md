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
