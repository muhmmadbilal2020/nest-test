import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Rating } from './rating.entity';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, User, Movie])],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
