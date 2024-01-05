import { trace } from 'console';
import { Category } from 'src/category/models/category.entity';
import { Transaction } from 'src/transaction/models/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  JoinColumn,
  EntitySchemaEmbeddedColumnOptions,
  OneToOne,
  ObjectId,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: '_id' })
  categories: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  @JoinColumn({ name: '_id' })
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
/*
@Entity()
export class Category {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  //@Column(() => User)
  //@JoinColumn({ name: 'user_id' })
  //user: User;

  //@Column(() => Transaction)
  //transactions: Transaction[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
*/
