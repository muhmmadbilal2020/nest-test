import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Repository, getRepository } from 'typeorm';
import { Category } from './categories/category.entity';
import { Movie } from './movies/movie.entity';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('Seed');
  try {
    // const categoryRepository = getRepository(Category);
    // const movieRepository = getRepository(Movie);
    const categoryRepository = app.get<Repository<Category>>(getRepositoryToken(Category));
    const movieRepository = app.get<Repository<Movie>>(getRepositoryToken(Movie));

    const categories = [
      { name: 'Action' },
      { name: 'Horror' },
      { name: 'Comedy' },
      { name: 'Animated' },
    ];

    const savedCategories = await categoryRepository.save(categories);

    const movies = [
      { title: 'Movie 1', category: savedCategories[0] },
      { title: 'Movie 2', category: savedCategories[1] },
      { title: 'Movie 3', category: savedCategories[2] },
      { title: 'Movie 4', category: savedCategories[3] },
    ];

    await movieRepository.save(movies);
    logger.log('Seeding completed successfully');
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`, error.stack);
  } finally {
    await app.close();
  }
}

bootstrap();
