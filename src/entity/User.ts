import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'test_admin_users'})
export class User{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    username:string;

    @Column({unique:true})
    email:string;

    @Column({unique:true})
    mobile:number;

    @Column()
    password:string;
}