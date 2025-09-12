mkdir server 
cd server
mkdir controllers routes model utils config logger
touch server.js .gitignore .env .README.md
npm init -y 
npm i express dotenv bcrypt jsonwebtoken cookie-parser helmet express-rate-limit pino pino-http pino-pretty  
npm i -D nodemon --save-dev
echo "console.log('hello world')" > server.js
node server.js