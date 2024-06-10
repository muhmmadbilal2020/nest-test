import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string): Promise<Movie[]> {
    console.log("categoryId ===== ", categoryId);
    return this.moviesService.findByCategory(categoryId);
  }
}
