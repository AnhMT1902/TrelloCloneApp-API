import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Broad } from "../../broad/schema/broad.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }] })
  broads: Broad[];
}

export const UserSchema = SchemaFactory.createForClass(User);