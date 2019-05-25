# giphy-search-server
Basic server implementation using Node, Express and MongoDB. Connect to Giphy API and Mongo Atlas to access Gifs and manage user data.

# Accounts required for this project
In order to run this project you will need a couple of accounts to get up and running: 

1.) MongoDB Atlas  - This account with let you create a Mongo cluster to store and manage data for your project. https://www.mongodb.com/cloud/atlas <br/><br/>
2.) Firebase Authentication Admin - This is used for decoding auth tokens to access user sessions. https://firebase.google.com/docs/auth/admin/verify-id-tokens

# Project set up 
First you will need to add a `.env` file to your project's root directory. The file should contain the following environment variables: <br/>
 
 ```sh
DB_INSTANCE=[YOUR URL FOR YOUR MONGO DB CLUSTER]
FIREBASE_URL=[YOUR URL TO YOUR FIREBASE PROJECT]
GIPHY_API_KEY=[YOUR GIPHY API KEY]
GIPHY_HOST=http://api.giphy.com
```

Next you will need to add a `firebase.json` file to the constants directory. You can find the contents of this file in your firebase admin console. Contents should resemble: 
 ```sh
{
  "type": [YOUR TYPE],
  "project_id": [YOUR PROJECT ID],
  "private_key_id": [YOUR PROJECT KEY ID],
  "private_key": [YOUR SUPER LONG SUPER SECRET PRIVATE KEY],
  "client_email": [YOUR CLIENT EMAIL],
  "client_id": [YOUR CLIENT ID],
  "auth_uri": [YOUR AUTH URI],
  "token_uri": [YOUR TOKEN URI],
  "auth_provider_x509_cert_url": [YOUR AUTH PROVIDER CERT URL],
  "client_x509_cert_url": [YOUR CLIENT CERT URL]
}

```

Lastly, run <br/>
 ```sh
npm install
```
# Starting the server
To start the server on port `3001`: 
 ```sh
npm run dev
```

In your development console you should see 
```sh
Server is starting...
Server is listening on:  3001
```

To ensure server is running go to `http://localhost:3001/` in your web browser. If you see the following then you are up and running and good to go: 
```sh
{"message":"Server is serving!"}
```
