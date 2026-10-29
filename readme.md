# 🤖 WhatsApp Sticker Bot (Baileys + FFmpeg)

> Um bot de automação para criação de figurinhas estáticas e animadas no WhatsApp, desenvolvido em **Node.js**, utilizando **Baileys** (WebSocket) e **FFmpeg** para processamento gráfico de mídia.

---

## ✨ Funcionalidades

- 🖼️ **Figurinhas Estáticas:** Converte imagens para o formato WebP (512x512).
- 🎬 **Figurinhas Animadas:** Converte vídeos curtos ou GIFs (até 6 segundos) em figurinhas animadas.
- 📐 **Redimensionamento Personalizado:** Otimizado para cobrir a área de 512x512 sem bordas pretas indesejadas.
- ⚡ **Sem Navegador Embutido:** Usa conexão WebSocket nativa, tornando-o leve e rápido em comparação a frameworks baseados em Puppeteer/Selenium.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) - Conexão nativa via Socket ao WhatsApp
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) e [@ffmpeg-installer/ffmpeg](https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg) - Manipulação de vídeo e imagem
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal) - Renderização de QR Code no terminal
- [@hapi/boom](https://www.npmjs.com/package/@hapi/boom) - Tratamento de erros HTTP/Socket e reconexão

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** (v18 ou superior) instalado em sua máquina.

### 2. Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
npm install
```

### 3. Execução
Execute o bot no terminal:

```bash
node index.js
```

Após o comando, escaneie o **QR Code** exibido no terminal utilizando o recurso **Aparelhos Conectados** do seu WhatsApp.

---

## 💬 Como Usar

1. Abra qualquer conversa no WhatsApp.
2. Envie uma imagem, vídeo curto ou GIF com a legenda **`!fig`**.
3. O bot responderá com a figurinha gerada em poucos segundos.

---

## 🔒 Segurança

As credenciais da sua sessão são armazenadas localmente na pasta `auth_info_baileys/`. **Nunca suba essa pasta para repositórios públicos**.

---

## 📝 Licença

Este projeto é de uso livre sob a licença **MIT**.