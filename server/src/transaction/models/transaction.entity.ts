import { Category } from 'src/category/models/category.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  //PrimaryGeneratedColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  OneToOne,
  ObjectId,
} from 'typeorm';

@Entity()
export class Transaction {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column({ nullable: true })
  type: string;

  @OneToOne(() => User)
  @JoinColumn({ name: '_id' })
  user: User;

  @OneToOne(() => Category)
  @JoinColumn({ name: '_id' })
  category: Category;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
