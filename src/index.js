const { scheduleDailyTrivia } = require('./scheduler/schedulePost');
const { rwClient } = require('./twitter/twitterClient');
const { getRandomTrivia } = require('./trivia/triviaFetcher');
const http = require('http');

async function postTestTrivia() {
    const trivia = getRandomTrivia();
    const postContent = trivia.question || trivia.fact || 'Here’s a test trivia!';

    try {
        await rwClient.v2.tweet(postContent);
        console.log('Test trivia posted:', postContent);
    } catch (error) {
        console.error('Error posting test trivia:', error);
    }
}

function startHttpServer() {
    const PORT = process.env.PORT || 3000;
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Trivia bot is running!');
    }).listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

function startBot() {
    console.log('Starting Trivia Bot...');
    postTestTrivia();
    scheduleDailyTrivia();
    startHttpServer();
}

startBot();
