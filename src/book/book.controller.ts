import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
