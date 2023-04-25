import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import axios, { AxiosRequestConfig } from 'axios';

const app = express();
app.use(express.json()); //Used to parse JSON bodies
dotenv.config(); //Reads .env file and makes it accessible via process.env
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT|| ""),
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CACERT,
  }
});

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log("Swimming in Digital Ocean!");
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

app.get("/hi", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi SGDs");
});



//=================================================
interface Payload {
  data: string;
}

async function openAiPostRequest(endpoint: string, requestData: any): Promise<any> {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}` 
    }
  };

 
  try {
    const response = await axios.post(`https://api.openai.com/v1/chat/completions`, requestData, config);
    console.log(`this is the response ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to make OpenAI API request to ${endpoint}`);
  }
}

app.post("/api/susai", async (req: Request, res: Response, next: NextFunction) => {
const {data} = req.body;
const payload: Payload = {data};
console.log('here is the request body');
 console.log(data); 
  // Output the request body
  const requestData1 = {
    "model": "gpt-3.5-turbo",
    "temperature": 0,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "messages": [
        {
            "role": "user",
            "content": `${data}`
        }
    ]
    
};

const response = await openAiPostRequest('completions', requestData1);
console.log(response); // Output the response from the OpenAI API
  res.send(response);
});
//=================================================





app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
