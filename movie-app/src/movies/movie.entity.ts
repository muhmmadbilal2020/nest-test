import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  categoryId: number;
}
