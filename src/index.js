// ==========================================================================
// Dice Game Bot Project - Script Header
// ==========================================================================
//
// Project: Dice Game Bot
// Repository: https://github.com/tamecalm/trivia-bot
// 
// Description: 
// A robust and extensible module designed for a multiplayer dice game bot. 
// Feel free to use, modify, or contribute to the project under the terms of the repository's license.
//
// Author: Engr John! 🧑‍💻
// Year: 2024
// 
// License: Licensed under the terms of the repository's license. Unauthorized duplication, 
// Modification, or distribution of this script outside the license terms is prohibited.
// ==========================================================================

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


// ==========================================================================
// Contact: 
// If you have questions, suggestions, or ideas for improvement, please reach out through the project's repository.
//
// Contributions are highly encouraged to help improve and expand this project. Let's 
// Make it better together. Happy coding! 💡
// ==========================================================================
