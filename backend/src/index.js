import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import router from './router.js';


const port = process.env.PORT || 9000;

const app = express();
app.use(express.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))

app.use(cors());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

