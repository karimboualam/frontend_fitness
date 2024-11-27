# Utiliser une image légère de Node.js
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json /app/

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . /app/

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application React
CMD ["npm", "start"]
