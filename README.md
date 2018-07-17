# BetterDoctor Search Engine
A simple search engine for the [BetterDoctor API](https://developer.betterdoctor.com/)

## development
Frontend and backend run separately for hot reloading. Copy `user-key.example.json` into `user-key.json` and add your api key.
- backend: `nodemon server.js`
- frontend: `npm run client`
- tests: `npm run test`

## prod
- build: `npm run build`
- docker build and push
