import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { List } from "../../list/schema/list.schema";

export type CardDocument = HydratedDocument<Card>

@Schema()
export class Card {
  @Prop()
  detail: String;

  @Prop()
  index_list: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Card" })
  List_id: List;
}

export const CardSchema = SchemaFactory.createForClass(Card);