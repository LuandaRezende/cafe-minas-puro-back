import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT) || 3001;
  await app.listen(port);
  app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  
  console.log(`Run in port ${await app.getUrl()}`);
}
bootstrap();
