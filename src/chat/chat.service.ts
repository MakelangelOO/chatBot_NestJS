import { Injectable } from '@nestjs/common';
import { Message } from './dto/message.dto';
import { OpenAI } from 'openai';
import axios from 'axios';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { CsvData } from './interfaces/csvData.interface';
 
@Injectable()
export class ChatService {
  private openai: OpenAI; // variable for OpenAi use

  constructor() {
    this.openai = new OpenAI({apiKey: process.env.OPEN_API_KEY})// initialization of the openAi with the api key
  }

  async interactWithChatbot(query: Message): Promise<string> { // this method is controlling the interaccion with the OpenAi for get the result
    
    const response = await this.openai.chat.completions.create({//creating a OpenAi peticion
      model: 'gpt-3.5-turbo-instruct', // the model of the ia to be used is indicated
      messages: [{ role: 'user', content: query.message}],// set the initial user message for ai model
      tools: [ // this array sends the available methods so that the model can send a response
        {
          type: "function",
          function: {
            name: 'searchProducts',
            description: 'Search for products related to the user query',
            parameters: {
              type: 'object',
              properties: {
                query: { type: 'string' },
              },
              required: ['query'],
              additionalPropierties: false
            },
          }
        },
        {
          type: "function",
          function: {
            name: 'convertCurrencies',
            description: 'Convert currency from one type to another',
            parameters: {
              type: 'object',
              properties: {
                amount: { type: 'number' },
                from_currency: { type: 'string' },
                to_currency: { type: 'string' },
              },
              required: ['amount', 'from_currency', 'to_currency'],
              additionalPropierties: false
            },
          }
        }
      ],
      tool_choice: 'auto', // the engine will decide which tool to use
    });

    if (response.choices[0].finish_reason === 'tool_calls') {// controlling if the query is for some of the methods
      const functionName = response.choices[0].message.tool_calls[0].function.name; // obtener el nombre de la función que el modelo Ai cree que puede utilizar para enviar una respuesta
      const functionArgs = JSON.parse(response.choices[0].message.tool_calls[0].function.arguments); // get the function arguments

      if (functionName === 'searchProducts') { //executing and send response in case that the ai model use searchProducts function
        return this.searchProducts(functionArgs.query);
      }

      if (functionName === 'convertCurrencies') { //executing and send response in case that the ai model use convertCurrencies function
        return this.convertCurrencies(functionArgs.amount, functionArgs.from_currency, functionArgs.to_currency);
      }
    }

    return response.choices[0].message.content;// ai model response in another case
  }


  async searchProducts(query: string): Promise<string> { // function to serch products in the csv file and send response
    const products: Array<CsvData> = [];// initialize the product list as an empty array
    const csvPath = './src/chat/resources/products_list (4).csv'; // get csv file's path

    return new Promise((resolve, reject) => { // return the result in a promise
      fs.createReadStream(csvPath)
        .pipe(csv()) //open the csv file
        .on('data', (row) => { // iterating over the csv file
          if (row.displayTitle.toLowerCase().includes(query.toLowerCase()) || row.embeddingText.toLowerCase().includes(query.toLowerCase())) { // includes in the array products, any row that matches the user's request
            products.push(row);
          }
        })
        .on('end', () => { // when the iteration is closed
          if (products.length === 0) { 
            resolve('No products found related to your query.'); //send a response when the search has no matches
          } else {
            const selectedProducts = products.slice(0, 2); // if there is a match, send first two matches
            resolve(`Found products: ${JSON.stringify(selectedProducts)}`);
          }
        })
        .on('error', (err) => {
          reject(err);// in case of error, this error is sent
        });
    });
  }

  async convertCurrencies(amount: number, from_currency: string, to_currency: string): Promise<string> { //Function to convert currencies using the Open Exchange Rates API
    try {
      const response = await axios.get(`https://openexchangerates.org/api/latest.json`, {
        params: {
          app_id: process.env.OPEN_EXCHANGE_API_KEY, // Api key of Open Exchange Rates
        },
      });// send a get request to Open Exchange to obtain the json of the exchange rates

      const rates = response.data.rates;// get rates
      const fromRate = rates[from_currency.toUpperCase()]; // get initial rate
      const toRate = rates[to_currency.toUpperCase()]; // get final rate
      

      if (!fromRate || !toRate) { // check rates
        return `Currency conversion not possible for ${from_currency} to ${to_currency}.`; // if the rates have not been obtained, send message
      }

      const convertedAmount = (amount / fromRate) * toRate; // calculate the convertion
      
      return `Converted amount: ${convertedAmount.toFixed(2)} ${to_currency}`; //return the convertion
    } catch (error) {
      console.error(error);
      return 'Error fetching currency conversion rates.'; //in case of error, this message is sent
    }
  }
}
