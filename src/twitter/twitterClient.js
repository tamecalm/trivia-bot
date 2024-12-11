const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

// Create Twitter API client with credentials from environment variables
const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Export the client for use in other files
const rwClient = client.readWrite;

module.exports = { rwClient };
