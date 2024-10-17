import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController], // import endpoints
  providers: [ChatService], // import services
})
export class ChatModule {}
