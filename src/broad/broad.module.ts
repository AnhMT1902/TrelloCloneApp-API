import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Broad, BroadSchema } from "./schema/broad.schema";
import { BroadController } from "./broad.controller";
import { BroadService } from "./broad.service";
import { JwtAuthGuard } from "../auth/middleware/JwtAuthGuard";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { User, UserSchema } from "../auth/schema/user.schema";

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{
      name: Broad.name, schema: BroadSchema
    }]), MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }])],
  controllers: [BroadController],
  providers: [BroadService, JwtAuthGuard, JwtService, AuthService]
})
export class BroadModule {
}