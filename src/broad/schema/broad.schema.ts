import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import { List } from "../../list/schema/list.schema";

export type broadDocument = HydratedDocument<Broad>;

@Schema()
export class Broad {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  users: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }] })
  lists: List[];
}

export const BroadSchema = SchemaFactory.createForClass(Broad);