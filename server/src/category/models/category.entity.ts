//import { ObjectId } from 'mongodb';
import { Transaction } from 'src/transaction/models/transaction.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  //PrimaryGeneratedColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  OneToOne,
  ObjectId,
} from 'typeorm';

@Entity()
export class Category {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @OneToOne(() => User)
  @JoinColumn({ name: '_id' })
  user: string;

  @Column()
  transactions: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
