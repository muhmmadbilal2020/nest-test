import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { RatingsModule } from './ratings/ratings.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { User } from './users/user.entity';
import { Category } from './categories/category.entity';
import { Movie } from './movies/movie.entity';
import { Rating } from './ratings/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movie_nestjs',
      entities: [User, Category, Movie, Rating],
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
    MoviesModule,
    UsersModule,
    RatingsModule,
    RecommendationsModule,
  ],
})
export class AppModule {}
