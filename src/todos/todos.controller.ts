import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, HttpCode, HttpStatus, HttpException, UseInterceptors } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { LoggingInterceptor } from './interceptors/logging-interceptor';
import { ResponseMsg } from './decorators/response-message-decorator';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptors';

// @UseInterceptors(LoggingInterceptor)
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  // @HttpCode(HttpStatus.OK)
  // create(@Body() createTodoDto: CreateTodoDto) {
  //   return this.todosService.create(createTodoDto);
  // }
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('굳굳굳')
  async create(@Body() createTodoDto: CreateTodoDto) {
    const createdTodo = await this.todosService.create(createTodoDto);
    return createTodoDto;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('굳굳굳굳굳굳굳')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo==null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }    
    return foundTodo;
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo==null) {
      throw new HttpException('없음', HttpStatus.NOT_FOUND);
    }
    const updatedTodo = await this.todosService.update(+id, updateTodoDto);
    return {
      message: "굳",
      statusCode: 200,
      data: updatedTodo
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
