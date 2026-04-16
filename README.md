# Slack Build Trigger Plugin

## Overview

This is a Slack app/plugin that allows users to trigger builds by issuing a slash command (e.g. `/build`) inside Slack. When the command is invoked, the app will trigger a build process (configurable: local shell script or webhook) and reply with the build status result.

## Requirements

- Node.js (v16+ recommended)
- Slack App credentials (Bot Token, Signing Secret)
- Permission to create a slash command in your Slack workspace

## How it works

1. User types `/build` in any Slack channel where the bot is present.
2. The Slack app receives the command and triggers a build (e.g., runs `./build.sh` or sends an HTTP request to a CI server).
3. The app reports back in Slack with build submission status (and later with build results, if needed).

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a Slack app at https://api.slack.com/apps , enable slash commands, and get Bot Token and Signing Secret.

3. Set your Slack app credentials in a `.env` file:
   ```
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_SIGNING_SECRET=your-signing-secret
   ```

4. Create your build script (`build.sh`) or configure a webhook.

5. Start the server:
   ```
   npm start
   ```

6. Set your slash command's Request URL to `https://your-server-url/slack/events` (ngrok recommended for local dev).

## Extending

You can customize the build trigger to call a webhook or integrate with a CI/CD system as needed.

## License

MIT