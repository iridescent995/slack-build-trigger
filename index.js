require('dotenv').config();
const { App } = require('@slack/bolt');
const { exec } = require('child_process');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Slack slash command handler
app.command('/build', async ({ command, ack, respond }) => {
  await ack();

  // Start the build process by running a shell script
  exec('./build.sh', (error, stdout, stderr) => {
    if (error) {
      respond({
        response_type: 'ephemeral',
        text: `:x: Build failed to start. Error: ${error.message}`
      });
      return;
    }
    respond({
      response_type: 'in_channel',
      text: `:gear: Build triggered by <@${command.user_id}>.\n\`\`\`${stdout}\`\`\``
    });
  });
});

// Start app
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();