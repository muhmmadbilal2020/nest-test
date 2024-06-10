import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Movie)
  movie: Movie;
}
