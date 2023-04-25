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
            Definition of the order effects (Direct, Enabling, Structural): Direct: Immediate are direct effects of the production, operation, use and disposal of socio-technical systems. 
            This includes the properties and the full lifecycle impacts, such as in the Life-Cycle Assessment (LCA) approach. 
            Enabling: Enabling of operation and use of a system include any change enabled or induced by the system. Structural: Structural represent structural changes caused by the ongoing operation and use of the socio-technical system. 
            Definition of Sustainability Dimensions (Social, Environmental, Economic, Technical): Social: covers the relationships between individuals and groups. Individual: covers the individual's ability to thrive, exercise their rights, and develop freely. 
            Environmental: covers the use and stewardship of natural resources. Economic: covers the financial aspects and business value. Technical: covers the technical system’s ability to accommodate changes. 
            I want you to do a Sustainability Awareness Framework (SusAF) analysis based on the information given here and give me the response in a JSON format. 
            The informations are; 
            Company name: ${company_name } .
            Company goals: ${company_goals } .
            Company mission: ${company_mission} .
            Name of product: ${product_name} and more product ${product_description} and
            Product features: ${product_features} .
            Some SusAF Questions and answers are ${qna}
            For more information.
            You have to provide me:
            The list of positive and negative impacts combined in a sentence in precise words for each of the features as “effect”;
            Order of effects (there might be multiple) and combined in a sentence in precise words as “order”;
            Dimension as “dimension” and combined in a sentence in precise words;
            As well as threats and opportunities and possible actions can be taken for the future.
            in the following format: 
            body :{
            company_name: "company name",
            company_goals: "company goals",
            company_mission: "company mission",
            product_name: "product name",
            product_description: "product description",
          
            {
              "feature": "feature name",
              "effect": "positive and negative impact",
              "order": "order of effect",
              "dimension": "dimension",
            }
          }`
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
