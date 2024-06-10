import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRecommendations(@Request() req) {
    return this.recommendationsService.getRecommendations(req.user.userId);
  }
}
