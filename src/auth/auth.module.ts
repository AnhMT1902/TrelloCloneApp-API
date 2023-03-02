import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "./schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtAuthGuard } from "./middleware/JwtAuthGuard";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60000s" },
      verifyOptions: { algorithms: ["HS256"] }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard]
})
export class AuthModule {

}