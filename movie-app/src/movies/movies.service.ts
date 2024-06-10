import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findByCategory(categoryId: string): Promise<Movie[]> {
    return this.movieRepository.createQueryBuilder('movie')
      .innerJoinAndSelect('movie.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }
}
