import 'dotenv/config';
import express from 'express';
import connectDB from './database/index.js';
import bodyParser from 'body-parser';
import routes from "./routes/index.js"
import Jwt from "./services/Jwt.js"
import auth from './middlewares/auth.js';
const {
  APP_PORT
} = process.env;
const PORT = APP_PORT || 3000;
connectDB();
const app = express();
app.use(bodyParser.json())

app.use("/", auth)
app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});