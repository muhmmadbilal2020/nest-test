import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;
}
