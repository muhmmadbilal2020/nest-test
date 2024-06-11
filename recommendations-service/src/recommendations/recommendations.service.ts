import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getRecommendations() {
    const movies = await this.movieRepository.find();
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title
    }));
  }
}
