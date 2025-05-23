import * as process from 'node:process';

export default () => ({
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
  },
  chatgpt: {
    url: process.env.CHATGPT_API_URL,
    key: process.env.CHATGPT_API_KEY,
  },
});
