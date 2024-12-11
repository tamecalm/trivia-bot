# Trivia Bot

## Overview
Trivia Bot is an automated bot that fetches trivia questions or facts and posts them to Twitter on a scheduled basis.

## Project Structure
```
trivia-bot/
├── src/
│   ├── trivia/
│   │   ├── questions.json    # Store trivia questions or facts
│   │   └── triviaFetcher.js  # Logic to fetch a random trivia question or fact
│   ├── twitter/
│   │   ├── twitterClient.js  # Handles Twitter API interactions
│   ├── scheduler/
│   │   └── schedulePost.js   # Manages scheduling trivia posts
│   ├── index.js              # Main entry point
├── config/
│   └── config.js             # Stores API keys and environment variables
├── logs/
│   └── app.log               # Logs for debugging and tracking activities
├── .env                      # Environment variables (API keys, secrets)
├── .gitignore                # Ignore unnecessary files in git
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Dependency lock file
└── README.md                 # Project overview and setup instructions
```

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Populate `.env` with the required API keys and secrets.
4. Start the application by running `node src/index.js`.

