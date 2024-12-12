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
