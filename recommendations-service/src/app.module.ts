import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { Category } from './recommendations/category.entity';
import { Movie } from './recommendations/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'movie_nestjs',
      entities: [Category,Movie],
      synchronize: true,
    }),
    RecommendationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
