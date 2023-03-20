import { Types, Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Card } from "../../card/schema/card.schema";


@Schema()
export class List extends Document {
  @Prop()
  title: string;

  @Prop()
  index_broad: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Card" }] })
  cards: Types.ObjectId[] | Card[];
}

export const ListSchema = SchemaFactory.createForClass(List);