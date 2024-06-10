import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { httpResponse } from 'src/common/resp';

@Injectable()
export class RecommendationsService {
  constructor(private readonly httpService: HttpService) {}

  async getRecommendations(userId: string) {
    try {
      console.log(userId,'user id')
      const response = await lastValueFrom(
        this.httpService
          .get(`http://127.0.0.1:3001/recommendations/${userId}`)
          .pipe(retry(3), catchError(() => []))
      );
      // return response.data;
      return httpResponse(HttpStatus.ACCEPTED, "Recommended Services.", response.data)
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }
}
