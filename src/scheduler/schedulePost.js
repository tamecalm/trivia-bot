const schedule = require('node-schedule');
const { rwClient } = require('../twitter/twitterClient');
const { getRandomTrivia } = require('../trivia/triviaFetcher'); // Import trivia fetching logic

// In-memory store to track previously posted trivia
const postedTrivia = new Set();

// Function to schedule trivia post every 30 minutes
function scheduleDailyTrivia() {
    schedule.scheduleJob('*/30 * * * *', async () => { // Runs every 30 minutes
        let trivia = getRandomTrivia(); // Get a random trivia question or fact

        // Ensure trivia is unique and hasn't been posted recently
        while (postedTrivia.has(trivia.question) || postedTrivia.has(trivia.fact)) {
            console.log("Duplicate trivia detected, fetching new trivia...");
            trivia = getRandomTrivia(); // Fetch new trivia if it's a duplicate
        }

        // Select the trivia content to post
        const postContent = trivia.question ? trivia.question : trivia.fact;

        try {
            // Post trivia to Twitter
            await rwClient.v2.tweet(postContent); 
            console.log('Trivia posted:', postContent);
            
            // Add the posted trivia to the set to avoid re-posting
            if (trivia.question) {
                postedTrivia.add(trivia.question);
            } else if (trivia.fact) {
                postedTrivia.add(trivia.fact);
            }

            // Optional: Log the current state of posted trivia for debugging
            console.log('Current posted trivia:', Array.from(postedTrivia));
        } catch (error) {
            console.error('Error posting trivia:', error);
        }
    });
}

module.exports = { scheduleDailyTrivia };