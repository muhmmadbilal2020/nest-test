import { Controller, Post, Body, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { httpResponse } from 'src/common/resp';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async rateMovie(@Req() req, @Body('movieId') movieId: string, @Body('rating') rating: number) {
    // console.log(req.user)
    if(movieId == undefined){
      return httpResponse(HttpStatus.BAD_REQUEST, "Movie ID is required.")  
    }

    if(rating == undefined){
      return httpResponse(HttpStatus.BAD_REQUEST, "Rating is required.")  
    }

    return this.ratingsService.rateMovie(req.user.userId, movieId, rating);
  }
}
