export class CreateUserDto {
    username:string;
    name:string;
    email:string;
    mobile:number;
    password:string;
}

export class LoginUserDto{
    username:string;
    password:string;
}