
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const messageFromResponseMsgMetaData = this.reflector.get<string>('response-message', context.getHandler());
    return next.handle().pipe(map(data => ({ 
      message: messageFromResponseMsgMetaData || data.message,
      statusCode: context.switchToHttp().getResponse().statusCode,
      data: data
    })));
  }
}
