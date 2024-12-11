const schedule = require('node-schedule');
const { rwClient } = require('../twitter/twitterClient');
const { getRandomTrivia } = require('../trivia/triviaFetcher'); // Import trivia fetching logic

// Function to schedule trivia post every 30 minutes
function scheduleDailyTrivia() {
    schedule.scheduleJob('*/30 * * * *', async () => { // Runs every 30 minutes
        const trivia = getRandomTrivia();
        const postContent = trivia.question ? trivia.question : trivia.fact;

        try {
            await rwClient.v2.tweet(postContent); // Post trivia on Twitter
            console.log('Trivia posted:', postContent);
        } catch (error) {
            console.error('Error posting trivia:', error);
        }
    });
}

module.exports = { scheduleDailyTrivia };