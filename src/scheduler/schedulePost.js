const schedule = require('node-schedule');
const { rwClient } = require('../twitter/twitterClient');
const { getRandomTrivia } = require('../trivia/triviaFetcher');

const postedTrivia = new Set();

function scheduleDailyTrivia() {
    schedule.scheduleJob('*/30 * * * *', async () => {
        let trivia = getRandomTrivia();

        let retryCount = 0;
        const maxRetries = 5;

        // Ensure trivia is unique and hasn't been posted recently
        while ((trivia.question && postedTrivia.has(trivia.question)) ||
               (trivia.fact && postedTrivia.has(trivia.fact))) {
            if (retryCount >= maxRetries) {
                console.error('Max retries reached. Skipping posting.');
                return;
            }

            console.log('Duplicate trivia detected, fetching new trivia...');
            trivia = getRandomTrivia();
            retryCount++;
        }

        const postContent = trivia.question || trivia.fact || 'Here’s some trivia for you!';

        try {
            await rwClient.v2.tweet(postContent);
            console.log('Trivia posted:', postContent);

            if (trivia.question) postedTrivia.add(trivia.question);
            if (trivia.fact) postedTrivia.add(trivia.fact);

            // Keep the set size manageable
            if (postedTrivia.size > 100) {
                const [firstEntry] = postedTrivia;
                postedTrivia.delete(firstEntry);
            }
        } catch (error) {
            console.error('Error posting trivia:', error);
        }
    });
}

module.exports = { scheduleDailyTrivia };
