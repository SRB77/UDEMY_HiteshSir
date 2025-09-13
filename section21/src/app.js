const express = require('express');
const cors = require('cors')
const healthCheckRouter = require('../src/routes/healthcheck.routes.js');
const app = express();

//> Basic configuration 
app.use(express.json({limit:"30kb"})); //note This just limit the size of json coming from client(Frontend)
app.use(express.urlencoded({extended:true , limit:"16kb"}));
app.use(express.static("public"));

//> CORS configuration 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
  }),
);

//>HealthcheckRouter config
app.use('/api/v1/healthcheck',healthCheckRouter);


app.get('/', (req, res) => {
  res.send('<h1>This is just start of section 21</h1>');
});

module.exports = app;