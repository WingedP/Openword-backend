

const app = require("./app");
const https = require('https');
const fs = require('fs');
const path = require('path');

const server = https.createServer(
    {
    key: fs.readFileSync(path.join(__dirname, "./server.key")),
    cert: fs.readFileSync(path.join(__dirname, "./server.cert"))
},app
);

server.listen(process.env.PORT,()=>{
    console.log("App is running on PORT",process.env.PORT)
});

// openssl req -nodes -new -x509 -keyout server.key -out server.cert
