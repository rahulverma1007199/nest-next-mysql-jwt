import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'milkmaster14dec',
      entities: [User],
      synchronize: false,
    })
    ,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
