import {
  Column, CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChannelChats } from "./ChannelChats";
import { ChannelMembers } from "./ChannelMembers";
import { DMs } from "./DMs";
import { Mentions } from "./Mentions";
import { Workspacemembers } from "./Workspacemembers";
import { Workspaces } from "./Workspaces";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {timestamp} from "rxjs";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "nestjs" })
export class Users {

  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'aipooh8882@naver.com',
    description: '이메일',
  })
  @Column("varchar", { name: "email", unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column("varchar", { name: "nickname", length: 30 })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @CreateDateColumn({ name: 'createdAt', type: 'datetime' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updatedAt', type: 'datetime' })
  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => ChannelChats, (channelChats) => channelChats.user)
  channelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.user)
  channelMembers: ChannelMembers[];

  @OneToMany(() => DMs, (dms) => dms.sender)
  dms: DMs[];

  @OneToMany(() => DMs, (dms) => dms.receiver)
  dms2: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.sender)
  mentions: Mentions[];

  @OneToMany(() => Mentions, (mentions) => mentions.receiver)
  mentions2: Mentions[];

  @OneToMany(
    () => Workspacemembers,
    (workspacemembers) => workspacemembers.user
  )
  workspacemembers: Workspacemembers[];

  @OneToMany(() => Workspaces, (workspaces) => workspaces.owner)
  workspaces: Workspaces[];
}
