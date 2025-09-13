require('dotenv').config();
const connectDB = require('./db/database.js');
const app = require('./app.js');

const PORT = process.env.PORT || 3010;


connectDB().then(()=>{
  app.listen(PORT, () =>
    console.log(`server is running on http://localhost:${PORT}`),
  )
})
.catch((err)=>console.error("Mongodb connection error " , err));

