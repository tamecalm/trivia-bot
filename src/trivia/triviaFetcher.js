// ==========================================================================
// Trivia (X) Bot - Script Header
// ==========================================================================
//
// Project: Trivia (X) Bot
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

const fs = require('fs');
const path = require('path');

function getRandomTrivia() {
    const questionsFilePath = path.join(__dirname, 'questions.json');

    if (!fs.existsSync(questionsFilePath)) {
        console.error('questions.json file not found!');
        return { fact: 'Trivia file is missing!' };
    }

    const triviaData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));

    if (!Array.isArray(triviaData) || triviaData.length === 0) {
        console.error('Invalid or empty trivia data!');
        return { fact: 'No trivia available!' };
    }

    const randomIndex = Math.floor(Math.random() * triviaData.length);
    return triviaData[randomIndex];
}

module.exports = { getRandomTrivia };


// ==========================================================================
// Contact: 
// If you have questions, suggestions, or ideas for improvement, please reach out through the project's repository.
//
// Contributions are highly encouraged to help improve and expand this project. Let's 
// Make it better together. Happy coding! 💡
// ==========================================================================
