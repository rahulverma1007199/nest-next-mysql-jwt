import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/User";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret:'secret',
    signOptions:{expiresIn:'1d'}
  })
],
  controllers:[UsersController],
  providers:[UsersService]
})
export class UsersModule {}