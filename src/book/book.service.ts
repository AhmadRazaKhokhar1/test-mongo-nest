import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: mongoose.Model<Book>,
  ) {}

  //CRUD Operations

  //get all
  async findAll(): Promise<Book[]> {
    const books = await this.BookModel.find();
    return books;
  }
  //find one
  async findOne(id: string): Promise<Book> {
    try {
      const response = await this.BookModel.findById(id);
      if (!response || response === null) {
        throw new NotFoundException('The Book was not found');
      }
      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'There was an internal server error',
        );
      }
    }
  }
  //create one
  async create(Book: Book): Promise<Book> {
    const response = await this.BookModel.create(Book);
    return response;
  }
}
