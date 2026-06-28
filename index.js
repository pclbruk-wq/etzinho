const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// Servidor para manter o bot ativo
const app = express();
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot conectado!');
});

client.on('message', async (msg) => {
    if (msg.body === '!play musica') {
        msg.reply('🎵 Iniciando playlist de músicas...');
    } else if (msg.body === '!playvideo') {
        msg.reply('📺 Abrindo reprodutor de vídeo...');
    } else if (msg.body === '!brincadeirasvarias') {
        msg.reply('🎲 Vamos brincar! Escolha uma opção.');
    }
});

client.initialize();
