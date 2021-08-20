import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config/config.module';
import { ConfigService } from './config/config/config.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) =>
        configservice.getMongoConfig(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
