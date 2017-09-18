FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN npm install

# copy app files
COPY . .

# Bundle app source
WORKDIR /usr/src/app/browser
RUN npm run build
WORKDIR /usr/src/app

# install daemon
RUN npm install -g pm2

# expose container port
EXPOSE 3001

# start server
CMD ["pm2", "start", "--no-daemon", "server.js"]