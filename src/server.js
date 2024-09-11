import 'dotenv/config';
import express from 'express';
import connectDB from './database/index.js';
import bodyParser from 'body-parser';
import routes from "./routes/index.js"
import Jwt from "./services/Jwt.js"

const {
  APP_PORT
} = process.env;
const PORT = APP_PORT || 3000;
connectDB()
const app = express();
app.use(bodyParser.json());

app.use("/", (req,res,next)=>Jwt.verifyJWT(req,res,next))
app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});