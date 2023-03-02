import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { ExecutionContext } from "@nestjs/common";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    console.log(bearerToken, 1);
    if (!bearerToken) {
      return false;
    }
    const token = bearerToken.split(" ")[1];
    try {
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmhhbmgxOTBjMjAyQGdtYWlsLmNvbSIsInN1YiI6IiQyYiQxMCQwYnNaMnAvM3BsclJGdllER2N5ZkNldk9wSnlOcldEa3RaVXJvVG95amp2VEdxWm05empGTyIsIm5hbWUiOiJtaW5oIGFuaCIsIl9pZCI6IjYzZmYxMGU5NzU5NWE2YmM2MTViNzk2NyIsImlhdCI6MTY3NzcyMTg3MywiZXhwIjoxNjc3NzgxODczfQ.VG8x_glWw0moBgFNQJPxxHeiMRzrVI_ukmQjBP4DaN8'
      request.user = await this.jwtService.verify(token, jwtConstants);
      return true;
    } catch (err) {
      return false;
    }
  }
}


