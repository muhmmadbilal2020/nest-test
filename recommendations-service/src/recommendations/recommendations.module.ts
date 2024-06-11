import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, MovieRepository]),
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
