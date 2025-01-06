// ==========================================================================
// Trivia (X) Bot - Script Header
// ==========================================================================
// Project: Trivia (X) Bot
// Repository: https://github.com/tamecalm/trivia-bot
// Description: A robust and extensible module designed for scheduling and managing trivia quizzes. 
// Feel free to use, modify, or contribute to the project under the terms of the repository's license.
// Author: Engr John! 🧑‍💻
// Year: 2024
// License: Licensed under the terms of the repository's license. Unauthorized duplication, 
// Modification, or distribution of this script outside the license terms is prohibited.
// ==========================================================================

import { scheduleDailyTrivia } from './scheduler/schedulePost';
import http from 'http';

// Health check endpoint
function startHealthCheckServer() {
    const PORT = process.env.PORT || 3000;
    http.createServer((req, res) => {
        if (req.url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'OK', message: 'Trivia bot is running!' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Trivia bot is running!');
        }
    }).listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Function to restart the bot after 1.5 hours
function restartBotPeriodically() {
    const RESTART_INTERVAL = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
    setInterval(() => {
        console.log('Restarting Trivia Bot...');
        process.exit(0); // This will terminate the bot, which can be auto-restarted by a process manager (e.g., PM2, Docker)
    }, RESTART_INTERVAL);
}

// Start the bot
function startBot() {
    console.log('Starting Trivia Bot...');
    scheduleDailyTrivia();
    startHealthCheckServer();
    restartBotPeriodically();
}

startBot();

// ==========================================================================
// Contact: 
// If you have questions, suggestions, or ideas for improvement, please reach out through the project's repository.
//
// Contributions are highly encouraged to help improve and expand this project. Let's 
// Make it better together. Happy coding! 💡
// ========================================================================== 
