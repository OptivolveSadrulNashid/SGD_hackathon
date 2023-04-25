import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosRequestConfig } from 'axios';

const app = express();
app.use(express.json()); //Used to parse JSON bodies
dotenv.config(); //Reads .env file and makes it accessible via process.env

app.get("/hi", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi SDGs");
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
const {company_name, company_goals, company_mission, product_name, product_description, product_features, qna } = req.body;

const payload: Payload = {data};
console.log('here is the request body');
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
            "content": `The Sustainability Awareness Framework (SusAF) is a tool for sustainable design of software products and services. 
The SusAF workbook enables you to perform a guided capture analysis of the sustainability of your software. 
There are 5 dimensions in the SusAF which are social, individual, environmental, economic and technical. 
There are also 3 orders of effects which are immediate (first order), enabling (second order), and structural (third order). 
I want you to do a Sustainability Awareness Framework (SusAF) analysis based on the information given here and give me the response in a JSON format. 
The informations are; 
Company name: ${company_name } .
Company goals: ${company_goals } .
Company mission: ${company_mission} .
Name of product: ${product_name} and more product ${product_description} and
Product features: ${product_features} .
Some SusAF Questions and answers are ${qna}
For more information.
You have to provide me with the list of positive and negative impacts in precise words for each of the features in each of the SusAF dimensions mentioned with order of effects. 
As well as threats and opportunities and possible actions can be taken for the future.`
        }
    ]
    
};

const response = await openAiPostRequest('completions', requestData1);
console.log(response); // Output the response from the OpenAI API
  const result = response.choices[0].message.content;
  // const parsedresult = result.replace(/(\r\n|\n|\r)/gm, "");
  // console.log('this is the result');
  // console.log(parsedresult);
  res.send(result);
});
//=================================================





app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
