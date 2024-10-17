import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config'; // importing for use of .env variables

@Module({
  imports: [ConfigModule.forRoot(), ChatModule], //setting to accept .env variables and Chat Module endpoint
})
export class AppModule {}
