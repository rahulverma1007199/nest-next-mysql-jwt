export type CreateUserParams = {
    username:string;
    name:string;
    email:string;
    mobile:number;
    password:string;
};

export type LoginUserParams = {
    username:string;
    password:string;
}