import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/User";
import { LoginUserParams } from "src/utils/types";
import { CreateUserParams } from "src/utils/types";
import { Repository } from "typeorm";

@Injectable()

export class UsersService{
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  async registerUser(userDetails:CreateUserParams): Promise <User>{
    return this.userRepository.save(userDetails);
  }

  async getAllUsers()
    // :Promise <User> -- we can return every request with promise
    // any other variations that has used in below examples.
    {
    return this.userRepository.find();
  }

  async getSingleUser(id:number){
    return this.userRepository.findBy({id});
  }

  async findUser(userDetails:LoginUserParams):Promise <User>{
    const username = userDetails.username;
    return this.userRepository.findOneBy({username});
  }

}