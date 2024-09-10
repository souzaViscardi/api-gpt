import 'dotenv/config';
import express from 'express';
import connectDB from './database/index.js';
import bodyParser from 'body-parser';
import routes from "./routes/index.js"
const {
  APP_PORT
} = process.env;
const PORT = APP_PORT || 3000;
connectDB()
const app = express();
app.use(bodyParser.json());

app.use("/api", routes)
app.get("/", (req,res)=>{
    res.send("hoeelo")
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});