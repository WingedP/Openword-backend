
const app = require("./app");
const fs = require('fs');
const path = require('path');
require("dotenv").config();

let server
if (process.env.NODE_ENV==="development"){
    const https = require('https');
     server = https.createServer(
        {
        key: fs.readFileSync(path.join(__dirname, "./server.key")),
        cert: fs.readFileSync(path.join(__dirname, "./server.cert"))
    },app
    );
} else {
    const http = require('http');
     server = http.createServer(app)
}


server.listen(process.env.PORT,()=>{
    console.log("App is running on PORT",process.env.PORT)
});

// const app = require("./app");
// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer(app);

// server.listen(process.env.PORT,()=>{
//     console.log("App is running on PORT",process.env.PORT)
// });

// // openssl req -nodes -new -x509 -keyout server.key -out server.cert
