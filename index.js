const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// Servidor para manter o bot ativo no Render
const app = express();
app.get('/', (req, res) => res.send('Bot Online!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // O Puppeteer tentará encontrar o navegador automaticamente
        // com base no buildpack instalado.
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
