const fs = require('fs');
const path = require('path');

// Load trivia questions and facts from the questions.json file
function getRandomTrivia() {
    const questionsFilePath = path.join(__dirname, 'questions.json');
    const triviaData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));

    const randomIndex = Math.floor(Math.random() * triviaData.length);
    return triviaData[randomIndex];
}

module.exports = { getRandomTrivia };
