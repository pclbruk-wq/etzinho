const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// Servidor para manter o bot ativo no Render
const app = express();
app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Esta linha diz ao bot para usar o navegador já instalado no Render
        executablePath: '/usr/bin/google-chrome-stable',
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    // Isso gera o QR Code no log do Render
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot conectado com sucesso!');
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
