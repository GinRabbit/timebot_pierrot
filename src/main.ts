import { Client, Message, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const commands: Record<string, (message: Message) => void> = {
  '!time': (message) => {
    const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    if (message.channel.isTextBased()) {
      const channel = message.channel;
      if ('send' in channel) {
        channel.send(`現在の時刻: ${now}`);
      }
    }
  }
};

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const command = message.content.trim();
  const handler = commands[command];

  if (handler) {
    handler(message);
  } else {
    if (message.channel.isTextBased()) {
      message.channel.send("undefined");
    }
  }
});

const token = process.env.TOKEN;

if (token) {
  client.login(token);
} else {
  throw new Error('TOKENが設定されていません');
}

