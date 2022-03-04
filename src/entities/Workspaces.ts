import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Channels } from "./Channels";
import { DMs } from "./DMs";
import { Mentions } from "./Mentions";
import { Workspacemembers } from "./Workspacemembers";
import { Users } from "./Users";

@Index("name", ["name"], { unique: true })
@Index("OwnerId", ["ownerId"], {})
@Index("url", ["url"], { unique: true })
@Entity("workspaces", { schema: "nestjs" })
export class Workspaces {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 30 })
  name: string;

  @Column("varchar", { name: "url", unique: true, length: 30 })
  url: string;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @Column("int", { name: "OwnerId", nullable: true })
  ownerId: number | null;

  @OneToMany(() => Channels, (channels) => channels.workspace)
  channels: Channels[];

  @OneToMany(() => DMs, (dms) => dms.workspace)
  dms: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.workspace)
  mentions: Mentions[];

  @OneToMany(
    () => Workspacemembers,
    (workspacemembers) => workspacemembers.workspace
  )
  workspacemembers: Workspacemembers[];

  @ManyToOne(() => Users, (users) => users.workspaces, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "OwnerId", referencedColumnName: "id" }])
  owner: Users;
}
