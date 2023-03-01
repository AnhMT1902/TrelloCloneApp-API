import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import { Card } from "../../card/schema/card.schema";

export type ListDocuments = HydratedDocument<List>

@Schema()
export class List {
  @Prop()
  title: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Card'})
  cards: Card;
}

export const ListSchema = SchemaFactory.createForClass(List);