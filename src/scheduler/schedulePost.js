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

import { rwClient } from '../twitter/twitterClient';
import { getRandomTrivia } from '../trivia/triviaFetcher';

const postedTrivia = new Set();
const interval = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds

function scheduleDailyTrivia() {
    let postCount = 0;
    const maxPostsPerDay = 16;

    function postTrivia() {
        if (postCount >= maxPostsPerDay) {
            console.log('Daily limit reached. Scheduler paused until reset.');
            return;
        }

        let trivia = getRandomTrivia();

        let retryCount = 0;
        const maxRetries = 5;

        // Ensure trivia is unique and hasn't been posted recently
        while ((trivia.question && postedTrivia.has(trivia.question)) ||
               (trivia.fact && postedTrivia.has(trivia.fact)) ||
               (trivia.note && postedTrivia.has(trivia.note))) {
            if (retryCount >= maxRetries) {
                console.error('Max retries reached. Skipping posting.');
                return;
            }

            console.log('Duplicate trivia detected, fetching new trivia...');
            trivia = getRandomTrivia();
            retryCount++;
        }

        const postContent = trivia.question || trivia.fact || 'Here’s some trivia for you!';

        rwClient.v2.tweet(postContent)
            .then(() => {
                console.log('Trivia posted:', postContent);

                if (trivia.question) postedTrivia.add(trivia.question);
                if (trivia.fact) postedTrivia.add(trivia.fact);

                // Keep the set size manageable
                if (postedTrivia.size > 100) {
                    const [firstEntry] = postedTrivia;
                    postedTrivia.delete(firstEntry);
                }

                postCount++;
            })
            .catch((error) => {
                console.error('Error posting trivia:', error);
            });
    }

    // Start scheduler
    postTrivia(); // First post immediately
    setInterval(postTrivia, interval);
}

exports = { scheduleDailyTrivia };

// ==========================================================================
// Contact: 
// If you have questions, suggestions, or ideas for improvement, please reach out through the project's repository.
//
// Contributions are highly encouraged to help improve and expand this project. Let's 
// Make it better together. Happy coding! 💡
// ==========================================================================
