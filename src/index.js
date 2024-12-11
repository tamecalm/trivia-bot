const { scheduleDailyTrivia } = require('./scheduler/schedulePost'); // Adjust path if needed
const { rwClient } = require('./twitter/twitterClient'); // Twitter client for posting
const { getRandomTrivia } = require('./trivia/triviaFetcher'); // Function to get a random trivia
const http = require('http');

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

// Function to handle HTTP requests (for rendering purposes)
function startHttpServer() {
    const PORT = process.env.PORT || 3000; // Default to 3000 if Render doesn't provide a PORT
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Trivia bot is running!');
    }).listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

function startBot() {
    console.log('Starting Trivia Bot...');
    
    // Post a test trivia immediately when the bot starts
    postTestTrivia();

    // Schedule daily trivia posts
    scheduleDailyTrivia();

    // Start HTTP server to bind to the port for Render
    startHttpServer();
}

startBot();