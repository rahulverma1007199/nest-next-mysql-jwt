import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "src/dtos/CreateUser.dto";
import * as bcrypt from 'bcrypt';
import { UsersService } from "./user.services";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, response } from "express";
@Controller('/api/users')
export class UsersController{
  constructor(
    private userService : UsersService,
    private jwtService :JwtService,
  ){}
  @Post('register')
  async registerUser(
    @Body() createUserDto : CreateUserDto
    // we can also pass data like
    // @Body('username') username:string,
    // @Body('password') password :string,
    // @Param('id', ParseIntPipe) id: number
    
  ){
    const hasedPassword = await bcrypt.hash(createUserDto.password,12);
    createUserDto.password =  hasedPassword;
    const user = await this.userService.registerUser(createUserDto);
    return user;
  }

  @Get('/')
  async getAllUser(){
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getSpecificUser(
    @Param('id',ParseIntPipe) id:number
  ){
    const user = await this.userService.getSingleUser(id);
    return user;
  }

  @Post('/login')
  async login(
    @Body() loginUserDto :LoginUserDto,
    @Res({passthrough:true}) response:Response
  ){
    const user = await this.userService.findUser(loginUserDto);
    if(!user){
      throw new BadRequestException('Invalid Credentials');
    }

    if(!await bcrypt.compare(loginUserDto.password,user.password)){
      throw new BadRequestException('Invalid Credentials');
    }

    const jwt = await this.jwtService.signAsync({id:user.id});
    response.cookie('jwt', jwt,{httpOnly:true});

    return {
      message:"sucess"
    };
  }

  @Post('testAuth')
  async testAuth(
    @Req() request:Request
  ){
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if(!data){
        throw new UnauthorizedException();
      }

      const user = await this.userService.getSingleUser(data['id']);
      
      delete user[0]['password'];

      return user
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(
    @Res({passthrough:true}) response:Response)
    {
      response.clearCookie('jwt');

      return {message:"success"}
    }

}