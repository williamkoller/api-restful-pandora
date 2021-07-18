import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateOffsetService {
  /**
   * @param {number} page
   * @param {number} limit
   * @return {*}  {number}
   * @memberof CalculateOffsetService
   */
  calculateOffset(page: number, limit: number): number {
    const offset = limit * (page - 1);

    return offset;
  }
}
