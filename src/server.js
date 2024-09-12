require("dotenv").config();
import express from 'express';
import connectDB from './database/index.js';
import bodyParser from 'body-parser';
import routes from "./routes/index.js"
import Jwt from "./services/Jwt.js"
import auth from './middlewares/auth.js';
import {swaggerDocs,swaggerSetup} from './utils/swagger.js';
const PORT = process.env.PORT || 3000;
connectDB();
const app = express();
app.use(bodyParser.json())
app.use('/api-docs', swaggerDocs, swaggerSetup);

app.use("/api", auth)
app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});