

const app = require("./app");
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log("App is running on PORT",process.env.PORT)
});

// openssl req -nodes -new -x509 -keyout server.key -out server.cert
