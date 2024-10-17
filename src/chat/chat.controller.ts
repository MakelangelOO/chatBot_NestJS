import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './dto/message.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ChatBot')
@Controller('chat') //setting route
export class ChatController {
  constructor(private readonly chatService: ChatService) {} //this is the short form for setting up the service in this controller

  @Post() // decoration for making a post request
  @ApiOperation({summary: "Endpoint to Chat with Bot", description: "This endpoint enables communication with the ai chat bot and allows different types of responses to be obtained. For this OpenAi Chat Completion API is used."})
  interactWithChatbot(@Body() message: Message) {
    return this.chatService.interactWithChatbot(message); // call and return service response
  }

  @Post('searchProducts') //this endpoint is only for prub searchProducts method
  @ApiOperation({summary: "Endpoint to test searchProducts", description: "This endpoint enables a test to search for products in the csv file. By default the method uses 'Phone' to search for matches."})
  testOne() {
    return this.chatService.searchProducts("phone")
  }
  
  @Post('convertCurrencies') //this endpoint is only for prub convertCurrencies method
  @ApiOperation({summary: "Endpoint to test convertCurrencies", description: "This endpoint allows a test to change values to other exchange rates. By default the method uses twelve dollars and changes this value to the Colombian rate. For this Open Exchange Rates API is used."})
  testTwo() {
    return this.chatService.convertCurrencies(12, "Usd", "cop")
  }
}
