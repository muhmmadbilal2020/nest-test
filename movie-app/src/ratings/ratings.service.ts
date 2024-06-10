import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async rateMovie(userId: any, movieId: any, rating: number): Promise<Rating> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const movie = await this.movieRepository.findOne({ where: { id: movieId } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const newRating = this.ratingRepository.create({
      user,
      movie,
      rating,
    });
    return this.ratingRepository.save(newRating);
  }

  // Other service methods...
}
