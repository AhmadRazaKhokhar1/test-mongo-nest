import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';

@Controller('book')
export class BookController {
  constructor(private BookService: BookService) {}

  @Get('get-all')
  async getAllBooks(): Promise<Book[]> {
    return this.BookService.findAll();
  }

  @Post('create')
  async createBook(
    @Body()
    Book: Book,
  ): Promise<Book> {
    return this.BookService.create(Book);
  }

  @Get('find-book/:id')
  async getOneBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.BookService.findOne(id);
  }

  @Put('update-book/:id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    Book: Book,
  ): Promise<Book> {
    return this.BookService.update(id, Book);
  }

  @Delete('delete-book/:id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<{ status: number; message: string }> {
    return await this.BookService.delete(id);
  }
}
