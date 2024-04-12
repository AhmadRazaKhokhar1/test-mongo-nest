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
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
  //create one
  async create(Book: Book): Promise<Book> {
    const response = await this.BookModel.create(Book);
    return response;
  }

  //update
  async update(id: string, Book: Book): Promise<Book> {
    return this.BookModel.findByIdAndUpdate(id, Book, {
      new: true,
      runValidators: true,
    });
  }

  //delete
  async delete(id: string): Promise<{ status: 200; message: string }> {
    const response = await this.BookModel.findByIdAndDelete(id);
    if (!response.id) {
      throw new NotFoundException('There was an error while deleting the book');
    }
    return {
      status: 200,
      message: 'The Book was successfully deleted',
    };
  }
}
