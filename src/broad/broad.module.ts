import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Broad, BroadSchema } from "./schema/broad.schema";
import { BroadController } from "./broad.controller";
import { BroadService } from "./broad.service";
import { JwtAuthGuard } from "../auth/middleware/JwtAuthGuard";
import { JwtService } from "@nestjs/jwt";
// import { AuthService } from "src/auth/auth.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: Broad.name, schema: BroadSchema }])],
  controllers: [BroadController],
  providers: [BroadService,
    JwtAuthGuard,
    JwtService
    // AuthService
  ]
})
export class BroadModule {
}