import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { List } from "../../list/schema/list.schema";
import { Broad } from "../../broad/schema/broad.schema";

export type CardDocument = HydratedDocument<Card>

@Schema()
export class Card {
  @Prop()
  detail: String;

  @Prop()
  index_list: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Card" })
  lists: List;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Broad" })
  broads: Broad;
}

export const CardSchema = SchemaFactory.createForClass(Card);