import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum BookCategory {
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  category: BookCategory;
}

export const BookSchema = SchemaFactory.createForClass(Book);
