import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import { Card } from "../../card/schema/card.schema";
import { Broad } from "../../broad/schema/broad.schema";

export type ListDocuments = HydratedDocument<List>

@Schema()
export class List {
  @Prop()
  title: string;

  @Prop()
  index_broad: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Broad" })
  broad: Broad;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }] })
  cards: Card[];
}

export const ListSchema = SchemaFactory.createForClass(List);