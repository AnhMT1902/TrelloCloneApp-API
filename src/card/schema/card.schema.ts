import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Card extends Document {
  @Prop()
  detail: String;

  @Prop()
  index_list: number;

  @Prop()
  lists: String;
}

export const CardSchema = SchemaFactory.createForClass(Card);