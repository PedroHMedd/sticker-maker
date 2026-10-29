console.log("Iniciando o script...");

   const { default: makeWASocket, useMultiFileAuthState, downloadMediaMessage, DisconnectReason } = require('@whiskeysockets/baileys');
   const { Boom } = require('@hapi/boom');
   const qrcode = require('qrcode-terminal');
   const P = require('pino');
   const fs = require('fs');
   const ffmpeg = require('fluent-ffmpeg');
   const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

   ffmpeg.setFfmpegPath(ffmpegInstaller.path);

   async function connectToWhatsApp() {
       const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

       const sock = makeWASocket({
           auth: state,
           printQRInTerminal: false,
           logger: P({ level: 'silent' }),
           browser: ["Sticker Bot", "Chrome", "4.0.0"]
       });

       sock.ev.on('creds.update', saveCreds);

       sock.ev.on('connection.update', (update) => {
           const { connection, lastDisconnect, qr } = update;
           
           if (qr) {
               console.log("\nEscaneie o QR Code abaixo com o seu WhatsApp:\n");
               qrcode.generate(qr, { small: true });
           }

           if (connection === 'close') {
               const shouldReconnect = (lastDisconnect?.error instanceof Boom) ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true;
               if (shouldReconnect) {
                   connectToWhatsApp();
               }
           } else if (connection === 'open') {
               console.log('\n🔥 Bot de figurinhas online e conectado com sucesso!');
           }
       });

       sock.ev.on('messages.upsert', async ({ messages }) => {
           const m = messages[0];
           if (!m.message) return;

           const messageType = Object.keys(m.message)[0];
           const isImageOrVideo = messageType === 'imageMessage' || messageType === 'videoMessage';
           const text = m.message.conversation || m.message.imageMessage?.caption || m.message.videoMessage?.caption || '';

           if (isImageOrVideo && text.trim().toLowerCase() === '!fig') {
               console.log('📥 Mídia detectada! Convertendo...');
               try {
                   const buffer = await downloadMediaMessage(
                       m,
                       'buffer',
                       {},
                       { logger: P({ level: 'silent' }), reuploadRequest: sock.updateMediaMessage }
                   );

                   const tempInput = `./temp_${Date.now()}.media`;
                   const tempOutput = `./temp_${Date.now()}.webp`;
                   fs.writeFileSync(tempInput, buffer);

                   await new Promise((resolve, reject) => {
                       ffmpeg(tempInput)
                           .outputOptions([
                               '-vcodec libwebp',
                               '-vf scale=512:512',
                               '-loop 0',
                               '-ss 00:00:00',
                               '-t 00:00:06',
                               '-preset default',
                               '-an',
                               '-vsync 0'
                           ])
                           .toFormat('webp')
                           .save(tempOutput)
                           .on('end', resolve)
                           .on('error', reject);
                   });

                   await sock.sendMessage(m.key.remoteJid, {
                       sticker: fs.readFileSync(tempOutput)
                   }, { quoted: m });

                   fs.unlinkSync(tempInput);
                   fs.unlinkSync(tempOutput);
                   console.log('✅ Figurinha enviada com sucesso!');
               } catch (err) {
                   console.error('❌ Erro ao converter:', err);
               }
           }
       });
   }

   connectToWhatsApp();