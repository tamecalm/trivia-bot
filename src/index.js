// ==========================================================================
// Trivia (X) Bot - Script Header
// ==========================================================================
//
// Project: Trivia (X) Bot
// Repository: https://github.com/tamecalm/trivia-bot
// 
// Description: 
// A robust and extensible module designed for scheduling and managing trivia quizzes. 
// Feel free to use, modify, or contribute to the project under the terms of the repository's license.
//
// Author: Engr John! 🧑‍💻
// Year: 2024
// 
// License: Licensed under the terms of the repository's license. Unauthorized duplication, 
// Modification, or distribution of this script outside the license terms is prohibited.
// ==========================================================================

const { scheduleDailyTrivia } = require('./scheduler/schedulePost');
const http = require('http');

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
