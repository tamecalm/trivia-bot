const { scheduleDailyTrivia } = require('./scheduler/schedulePost'); // Adjust path if needed
const { rwClient } = require('./twitter/twitterClient'); // Twitter client for posting
const { getRandomTrivia } = require('./trivia/triviaFetcher'); // Function to get a random trivia

// Function to post a test trivia immediately
async function postTestTrivia() {
    const trivia = getRandomTrivia(); // Get random trivia (question or fact)
    const postContent = trivia.question ? trivia.question : trivia.fact;

    try {
        await rwClient.v2.tweet(postContent); // Post the trivia to Twitter
        console.log('Test trivia posted:', postContent);
    } catch (error) {
        console.error('Error posting test trivia:', error);
    }
}

function startBot() {
    console.log('Starting Trivia Bot...');
    
    // Post a test trivia immediately when the bot starts
    postTestTrivia();

    // Schedule daily trivia posts
    scheduleDailyTrivia();
}

startBot();
