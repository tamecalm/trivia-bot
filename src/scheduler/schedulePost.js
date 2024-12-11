const schedule = require('node-schedule');
const { rwClient } = require('../twitter/twitterClient');
const { getRandomTrivia } = require('../trivia/triviaFetcher'); // Import trivia fetching logic

// Function to schedule daily trivia post at 9:00 AM
function scheduleDailyTrivia() {
    schedule.scheduleJob('0 9 * * *', async () => { // Runs daily at 9:00 AM
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
