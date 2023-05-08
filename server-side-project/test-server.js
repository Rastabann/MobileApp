const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5500;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Use socket.id as the unique user ID
  socket.emit("connected", socket.id);

  socket.on("marker", (marker) => {
    socket.broadcast.emit("marker", marker);
  });

  socket.on("removeMarker", (marker) => {
    socket.broadcast.emit("removeMarker", marker);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//  CHATGPT A PROPOS DU VPS

// Oui, vous pouvez utiliser Socket.IO sur un serveur VPS (Virtual Private Server) pour permettre une communication en temps réel entre votre serveur et les clients sur Internet.

// Voici les étapes générales pour utiliser Socket.IO sur un serveur VPS:

// Choisissez un fournisseur de VPS et créez un serveur VPS avec un système d'exploitation de votre choix (par exemple, Ubuntu, CentOS, Debian, etc.).

// Connectez-vous à votre serveur VPS via SSH.

// Installez Node.js sur votre serveur VPS. Vous pouvez consulter les instructions d'installation spécifiques à votre système d'exploitation sur le site officiel de Node.js: https://nodejs.org/en/download/package-manager/

// Transférez votre projet (y compris les fichiers server.js, package.json, et tout autre fichier nécessaire) vers votre serveur VPS en utilisant SCP, SFTP, ou un autre outil de transfert de fichiers.

// Sur votre serveur VPS, naviguez vers le répertoire de votre projet et installez les dépendances en exécutant:

// npm install
// Démarrez votre serveur Socket.IO en exécutant:
// node server.js
// Assurez-vous que les ports utilisés par votre serveur Socket.IO sont ouverts et autorisés dans les règles de pare-feu de votre VPS.

// Dans le code client de votre application, mettez à jour l'URL de connexion pour qu'elle corresponde à l'adresse IP ou au nom de domaine de votre VPS, ainsi qu'au port utilisé par votre serveur Socket.IO. Par exemple:

// const socket = io('http://your-vps-ip-or-domain:5500', { autoConnect: false });
// Maintenant, votre serveur Socket.IO devrait être accessible sur Internet via votre VPS, et les clients pourront se connecter et communiquer avec le serveur en temps réel.

// AUTRE CODE SERVEUR

// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const PORT = process.env.PORT || 5500;

// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   // Assign a unique user ID to the client
//   const userId = uuidv4();
//   socket.emit('connected', userId);

//   socket.on('marker', (marker) => {
//     socket.broadcast.emit('marker', marker);
//   });

//   socket.on('removeMarkers', (user) => {
//     socket.broadcast.emit('removeUserMarkers', user);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected:', socket.id);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// La ligne const { v4: uuidv4 } = require('uuid'); signifie que nous importons la fonction v4 du module uuid et la renommons en uuidv4 pour une meilleure lisibilité dans notre code.

// Le module uuid est un paquet npm qui permet de générer des identifiants uniques universels (UUID). La fonction v4 est utilisée pour générer des UUID de version 4, qui sont basés sur des nombres aléatoires.

// Dans le contexte de cet exemple, uuidv4 est utilisé pour générer des identifiants uniques pour chaque utilisateur qui se connecte au serveur. Cette ligne permet de déstructurer l'objet retourné par require('uuid') et d'extraire la fonction v4, en la renommant en uuidv4 pour une utilisation ultérieure dans le code.
