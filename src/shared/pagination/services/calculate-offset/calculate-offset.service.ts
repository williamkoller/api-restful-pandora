import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateOffsetService {
  calculateOffset(page: number, limit: number): number {
    return limit * (page - 1);
  }
}
