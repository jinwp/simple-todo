import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseTransformInterceptor } from './todos/interceptors/response-transform-interceptors';
import { ResponseMsg } from './todos/decorators/response-message-decorator';

@Controller('root')
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ResponseMsg('성공적')
  getHello(): string {
    return this.appService.getHello();
  }
}
