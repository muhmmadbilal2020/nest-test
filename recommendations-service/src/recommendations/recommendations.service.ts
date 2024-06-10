import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationsService {
  private readonly recommendations = {
    '1': [1, 2, 3],
    '2': [2, 3, 4],
    '3': [1, 2, 3],
    '4': [2, 3, 4],
    '5': [1, 2, 3],
    '6': [2, 3, 4],
    '7': [1, 2, 3],
    '8': [2, 3, 4],
    '9': [1, 2, 3],
    '10': [2, 3, 4],
    '11': [1, 2, 3],
    '12': [2, 3, 4],
    '13': [1, 2, 3],
    '14': [2, 3, 4],
  };

  getRecommendations(userId: string) {
    return this.recommendations[userId] || [];
  }
}
